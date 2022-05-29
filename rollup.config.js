// rollup.config.js
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    name: 'Escher',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
