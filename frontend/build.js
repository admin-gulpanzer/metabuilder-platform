import * as esbuild from 'esbuild';

console.log('Building with esbuild...');
esbuild.build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: 'es2020',
  minify: true,
  sourcemap: true,
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.jsx': 'jsx',
    '.js': 'js',
    '.css': 'css'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}).then(() => {
  console.log('Build completed successfully!');
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
