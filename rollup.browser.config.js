import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/es6-libray-boilerplate.js',
  dest: 'dist/es6-libray-boilerplate.browser.min.js',
  format: 'iife',
  sourceMap: true,
  moduleName: 'es6LibraryBoilerplate',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};