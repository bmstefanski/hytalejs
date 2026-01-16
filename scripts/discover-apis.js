#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DECOMP_PATH = '/Users/bmstefanski/Projects/hytale-js/hytale-decomp-main 2/com/hypixel/hytale/server/core';

const HIGH_VALUE_PACKAGES = [
  'entity',
  'universe/world/lighting',
  'asset/type/particle',
  'modules',
  'prefab',
  'cosmetics'
];

const SKIP_PATTERNS = [
  'Internal',
  'codec',
  'io/',
  'auth/',
  'console/',
  'receiver/',
  'task/',
  'registry/',
  'util/network',
  'util/thread'
];

const INTERESTING_METHODS = [
  'create', 'spawn', 'set', 'get', 'add', 'remove',
  'explosion', 'particle', 'light', 'effect',
  'teleport', 'damage', 'heal'
];

const ALREADY_BOUND = [
  'Universe', 'HytaleServer', 'Message', 'ItemStack', 'Item',
  'Vector3i', 'Vector3f', 'Vector3d', 'Vector2i', 'Vector2d', 'Vector2f',
  'Transform', 'Color', 'ColorLight', 'Box', 'Cylinder',
  'SoundEvent', 'SoundCategory', 'PlaySoundEvent2D'
];

function walkDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDirectory(filePath, fileList);
    } else if (file.endsWith('.java')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function shouldSkipFile(filePath) {
  return SKIP_PATTERNS.some(pattern => filePath.includes(pattern));
}

function isInHighValuePackage(filePath) {
  return HIGH_VALUE_PACKAGES.some(pkg => filePath.includes(pkg));
}

function extractClassInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let packageName = '';
  let className = '';
  let isPublic = false;
  let isEnum = false;
  let isInterface = false;
  let publicMethods = [];
  let hasPublicConstructor = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('package ')) {
      packageName = line.replace('package ', '').replace(';', '').trim();
    }

    if (line.includes('public class ') || line.includes('public final class ')) {
      isPublic = true;
      const match = line.match(/class\s+(\w+)/);
      if (match) className = match[1];
    }

    if (line.includes('public enum ')) {
      isEnum = true;
      isPublic = true;
      const match = line.match(/enum\s+(\w+)/);
      if (match) className = match[1];
    }

    if (line.includes('public interface ')) {
      isInterface = true;
      isPublic = true;
      const match = line.match(/interface\s+(\w+)/);
      if (match) className = match[1];
    }

    if (line.includes('public ' + className + '(')) {
      hasPublicConstructor = true;
    }

    if ((line.includes('public static ') || line.includes('public ')) &&
        (line.includes('(') && line.includes(')'))) {
      const methodMatch = line.match(/\s+(\w+)\s*\(/);
      if (methodMatch) {
        const methodName = methodMatch[1];
        if (methodName !== className && !publicMethods.includes(methodName)) {
          publicMethods.push(methodName);
        }
      }
    }
  }

  return {
    packageName,
    className,
    isPublic,
    isEnum,
    isInterface,
    publicMethods,
    hasPublicConstructor,
    fullClassName: packageName ? `${packageName}.${className}` : className
  };
}

function categorizeApi(classInfo, filePath) {
  const { className, publicMethods, isEnum } = classInfo;
  const lowerPath = filePath.toLowerCase();
  const lowerMethods = publicMethods.map(m => m.toLowerCase()).join(' ');

  if (lowerPath.includes('particle')) return 'particles';
  if (lowerPath.includes('light')) return 'lighting';
  if (lowerPath.includes('entity') && !lowerPath.includes('reference')) return 'entities';
  if (lowerPath.includes('explosion')) return 'explosions';
  if (lowerPath.includes('effect')) return 'effects';
  if (lowerPath.includes('prefab')) return 'prefabs';
  if (lowerPath.includes('cosmetic')) return 'cosmetics';
  if (lowerPath.includes('world') && !lowerPath.includes('config')) return 'world';
  if (isEnum) return 'enums';

  if (lowerMethods.includes('spawn') || lowerMethods.includes('create')) return 'utilities';

  return 'other';
}

function calculatePriority(classInfo, category, filePath) {
  const { publicMethods, isEnum, hasPublicConstructor, isInterface } = classInfo;
  const lowerMethods = publicMethods.map(m => m.toLowerCase()).join(' ');

  if (category === 'particles' || category === 'lighting' ||
      category === 'explosions' || category === 'entities') {
    return 'high';
  }

  if (category === 'effects' || category === 'world') {
    return 'high';
  }

  if (isEnum && publicMethods.length > 2) {
    return 'medium';
  }

  if (isInterface) {
    return 'low';
  }

  if (hasPublicConstructor && publicMethods.length > 3) {
    return 'medium';
  }

  const hasInterestingMethods = INTERESTING_METHODS.some(
    method => lowerMethods.includes(method)
  );

  if (hasInterestingMethods) {
    return 'high';
  }

  if (publicMethods.length > 5) {
    return 'medium';
  }

  return 'low';
}

function generateReason(classInfo, category) {
  const { className, isEnum, publicMethods, hasPublicConstructor } = classInfo;

  if (category === 'particles') {
    return `Enables particle effect spawning and manipulation`;
  }
  if (category === 'lighting') {
    return `Controls world lighting and light levels`;
  }
  if (category === 'explosions') {
    return `Creates and manages explosions in the world`;
  }
  if (category === 'entities') {
    return `Entity manipulation and management utilities`;
  }
  if (category === 'effects') {
    return `Applies gameplay effects to entities`;
  }
  if (category === 'world') {
    return `World manipulation and query utilities`;
  }
  if (isEnum) {
    return `Enum type providing ${className} constants`;
  }
  if (hasPublicConstructor) {
    return `Constructible class for ${className} with ${publicMethods.length} methods`;
  }

  return `Utility class providing ${publicMethods.length} public methods`;
}

function discoverApis() {
  console.log('Scanning decompiled Hytale server code...');
  console.log(`Source: ${DECOMP_PATH}\n`);

  if (!fs.existsSync(DECOMP_PATH)) {
    console.error(`Error: Decompiled code not found at ${DECOMP_PATH}`);
    process.exit(1);
  }

  const allFiles = walkDirectory(DECOMP_PATH);
  console.log(`Found ${allFiles.length} Java files`);

  const highValueFiles = allFiles.filter(f =>
    isInHighValuePackage(f) && !shouldSkipFile(f)
  );
  console.log(`Filtered to ${highValueFiles.length} high-value candidates\n`);

  const apis = [];

  for (const filePath of highValueFiles) {
    const classInfo = extractClassInfo(filePath);

    if (!classInfo.isPublic || !classInfo.className) {
      continue;
    }

    if (classInfo.isInterface && classInfo.publicMethods.length < 5) {
      continue;
    }

    const category = categorizeApi(classInfo, filePath);
    const priority = calculatePriority(classInfo, category, filePath);
    const reason = generateReason(classInfo, category);
    const alreadyBound = ALREADY_BOUND.includes(classInfo.className);

    apis.push({
      category,
      className: classInfo.fullClassName,
      simpleName: classInfo.className,
      priority,
      reason,
      publicMethods: classInfo.publicMethods.slice(0, 10),
      isEnum: classInfo.isEnum,
      isInterface: classInfo.isInterface,
      hasPublicConstructor: classInfo.hasPublicConstructor,
      alreadyBound,
      filePath: filePath.replace(DECOMP_PATH, '').replace(/^\//, ''),
      passes: false
    });
  }

  apis.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return a.simpleName.localeCompare(b.simpleName);
  });

  return apis;
}

function generateReport(apis) {
  const byCategory = {};
  const byPriority = { high: 0, medium: 0, low: 0 };

  for (const api of apis) {
    if (!byCategory[api.category]) {
      byCategory[api.category] = [];
    }
    byCategory[api.category].push(api);
    byPriority[api.priority]++;
  }

  let report = '# API Discovery Report\n\n';
  report += `**Total APIs Found:** ${apis.length}\n\n`;
  report += `**Priority Breakdown:**\n`;
  report += `- High: ${byPriority.high}\n`;
  report += `- Medium: ${byPriority.medium}\n`;
  report += `- Low: ${byPriority.low}\n\n`;

  report += '## Categories\n\n';
  for (const [category, categoryApis] of Object.entries(byCategory)) {
    report += `### ${category.charAt(0).toUpperCase() + category.slice(1)} (${categoryApis.length})\n\n`;

    for (const api of categoryApis.slice(0, 5)) {
      report += `- **${api.simpleName}** (${api.priority})\n`;
      report += `  - ${api.reason}\n`;
      report += `  - Methods: ${api.publicMethods.slice(0, 5).join(', ')}\n`;
      if (api.alreadyBound) {
        report += `  - ⚠️ Already bound\n`;
      }
      report += `\n`;
    }

    if (categoryApis.length > 5) {
      report += `  ... and ${categoryApis.length - 5} more\n\n`;
    }
  }

  report += '## Recommended First Batch\n\n';
  const highPriority = apis.filter(a => a.priority === 'high' && !a.alreadyBound);

  if (highPriority.length > 0) {
    const recommended = highPriority.slice(0, 3);
    report += 'Based on priority and gameplay value, start with:\n\n';

    for (const api of recommended) {
      report += `1. **${api.simpleName}** (${api.category})\n`;
      report += `   - ${api.reason}\n`;
      report += `   - Package: \`${api.className}\`\n`;
      report += `   - Key methods: ${api.publicMethods.slice(0, 3).join(', ')}\n\n`;
    }
  } else {
    report += 'No high-priority unbound APIs found.\n';
  }

  report += '## Next Steps\n\n';
  report += '1. Review the discovered APIs in `discovered-apis.json`\n';
  report += '2. Port the recommended first batch using the pattern in HytaleJS.java\n';
  report += '3. Add TypeScript types to packages/core/src/types.ts\n';
  report += '4. Create examples in examples/kitchensink/src/demo.ts\n';
  report += '5. Run verification: typecheck, gradle build, example build\n';
  report += '6. Commit and move to next batch\n';

  return report;
}

function main() {
  const apis = discoverApis();

  fs.writeFileSync(
    'discovered-apis.json',
    JSON.stringify(apis, null, 2)
  );
  console.log(`✓ Generated discovered-apis.json with ${apis.length} APIs`);

  const report = generateReport(apis);
  fs.writeFileSync('API_DISCOVERY_REPORT.md', report);
  console.log('✓ Generated API_DISCOVERY_REPORT.md');

  console.log('\nSummary:');
  console.log(`  High priority: ${apis.filter(a => a.priority === 'high').length}`);
  console.log(`  Medium priority: ${apis.filter(a => a.priority === 'medium').length}`);
  console.log(`  Low priority: ${apis.filter(a => a.priority === 'low').length}`);
  console.log(`  Already bound: ${apis.filter(a => a.alreadyBound).length}`);

  const unbound = apis.filter(a => !a.alreadyBound);
  console.log(`\n${unbound.length} APIs ready to port!`);
}

main();
