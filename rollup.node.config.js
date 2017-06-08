import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/es6-libray-boilerplate.js',
  dest: 'dist/es6-libray-boilerplate.node.min.js',
  format: 'cjs',
  sourceMap: true,
  moduleName: 'es6LibraryBoilerplate',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};