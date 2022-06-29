// rollup.config.js
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm', // cjs: 只适配 node，esm 比较全面
    name: 'Escher',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
