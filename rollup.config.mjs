import commonjs from '@rollup/plugin-commonjs'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import {visualizer} from 'rollup-plugin-visualizer'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import pkg from "./package.json" with {type: "json"}

const commonPlugins = [
    commonjs(),
    nodeResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectories: ['node_modules', 'src'],
        preferBuiltins: false
    }),
    json(),
    typescript({
        tsconfig: 'tsconfig.json',
        outputToFilesystem: true
    }),
    strip({
        include: ['**/*.(js|mjs|ts|tsx)'],
        debugger: true,
        functions: ['console.log', 'console.debug'],
        sourceMap: true
    }),
    terser(),
    visualizer({
        filename: 'build/status.common.html'
    })
]
const commonExternal = [
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
    ...(pkg.devDependencies ? Object.keys(pkg.devDependencies) : [])
]


let commonConfig = [{
    strictDeprecations: true,
    input: 'src/index.common.tsx',
    output: {
        file: 'lib/index.common.mjs',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
},
    {
        input: 'src/index.common.tsx',
        output: {
            file: 'lib/index.common.cjs',
            format: 'cjs',
            sourcemap: true,
            assetFileNames: '[name][extname]'
        },
        external: commonExternal,
        plugins: commonPlugins
    },
    {
        input: 'lib/dts/index.common.d.ts',
        output: [{file: 'lib/index.common.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: [
            dts()
        ]
    }
]

const serverConfig = [{
    input: 'src/index.server.tsx',
    output: {
        file: 'lib/index.server.mjs',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
}, {
    input: 'src/index.server.tsx',
    output: {
        file: 'lib/index.server.cjs',
        format: 'cjs',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
},
    {
        input: 'lib/dts/index.server.d.ts',
        output: [{file: 'lib/index.server.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: [
            dts()
        ]
    }
]

const clientConfig = [{
    input: 'src/index.client.tsx',
    output: {
        file: 'lib/index.client.mjs',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
}, {
    input: 'src/index.client.tsx',
    output: {
        file: 'lib/index.client.cjs',
        format: 'cjs',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: commonExternal,
    plugins: commonPlugins
},
    {
        input: 'lib/dts/index.client.d.ts',
        output: [{file: 'lib/index.client.d.ts'}],
        external: [/\.(css|scss)$/],
        plugins: [
            dts()
        ]
    }
]

const exportConfig = commonConfig.concat(serverConfig).concat(clientConfig)

export default exportConfig
