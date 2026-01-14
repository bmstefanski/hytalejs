import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/demo.ts'],
  bundle: true,
  format: 'esm',
  target: 'es2022',
  outfile: 'dist/demo.js',
});

console.log('Built dist/demo.js');
