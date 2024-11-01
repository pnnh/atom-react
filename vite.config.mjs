import {fileURLToPath, URL} from "url";
import {defineConfig} from 'vite'

export default defineConfig({
    plugins: [],
    resolve: {
        alias: [
            {
                find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))
            }
        ]
    },
})
