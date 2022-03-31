import babel from 'rollup-plugin-babel'
import bannerString from './rollup.banner'
import { nodeResolve } from '@rollup/plugin-node-resolve';
// format选项
// esm es6 模式
// iife(Immediately-invoked function expression ) 立即调用模式
// AMD
// CommonJS
// UMD
export default {
    external: ['vue'],
    input: './src/index.js',
    output: {
        format: 'es',
        file: './dist/index.js',
        name: 'VirtualList',
        sourcemap: false,
        globals: {
            vue: 'Vue',
        },
        banner: bannerString.replace(/\n/, ''),
    },
    plugins: [
        babel(),
        nodeResolve({ resolveOnly: ['@juggle/resize-observer'] }), // 这里指定包来解析，因为它是组件依赖包，Vue可以不解析，因为调用方会安装Vue
    ],
}
