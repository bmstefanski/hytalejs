const fs = require("fs");
const path = require("path");

const typesFile = path.join(__dirname, "../types/types.d.ts");
const outputFile = path.join(__dirname, "../content/docs/api/index.mdx");

const typesContent = fs.readFileSync(typesFile, "utf-8");

const regex = /^export (interface|type) (\w+)/gm;
const typeNames = Array.from(typesContent.matchAll(regex), (m) => m[2]);

const sortedTypes = [...new Set(typeNames)].sort();

let content = `---
title: API Reference
description: Complete type reference for HytaleJS
---

This page contains auto-generated documentation for all ${sortedTypes.length} HytaleJS types, sorted alphabetically.

`;

let currentLetter = "";
for (const type of sortedTypes) {
  const firstLetter = type[0].toUpperCase();
  if (firstLetter !== currentLetter) {
    currentLetter = firstLetter;
    content += `\n## ${currentLetter}\n\n`;
  }
  content += `### ${type}\n\n`;
  content += `<AutoTypeTable path="./types/types.d.ts" name="${type}" />\n\n`;
}

fs.writeFileSync(outputFile, content);
console.log(`Generated API reference with ${sortedTypes.length} types`);
