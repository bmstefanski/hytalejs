import * as esbuild from 'esbuild';
import swc from '@swc/core';
import { writeFileSync, mkdirSync } from 'fs';

const result = await esbuild.build({
  entryPoints: ['src/demo.ts'],
  bundle: true,
  format: 'esm',
  write: false,
});

const bundled = result.outputFiles[0].text;

const transformed = await swc.transform(bundled, {
  jsc: {
    loose: true,
  },
  env: {
    targets: 'ie 11',
    loose: true,
  },
});

mkdirSync('dist', { recursive: true });
writeFileSync('dist/demo.js', transformed.code);
console.log('Built dist/demo.js');
