import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

const formatOutputFile = environment => {
  switch (environment) {
    case 'iife':
      return 'dist/index.iife.js'
    case 'cjs':
      return 'dist/index.cjs.js'
    case 'types':
      return 'dist/index.d.ts'
  }
}

const plugins = environment => {
  if (environment === 'types') {
    return [dts()]
  }
  return [typescript(), terser()]
}

export default ({ environment }) => {
  return {
    input: 'src/index.ts',
    output: {
      format: environment === 'iife' ? 'iife' : 'cjs',
      file: formatOutputFile(environment),
      name: 'simte',
    },
    plugins: plugins(environment),
  }
}
