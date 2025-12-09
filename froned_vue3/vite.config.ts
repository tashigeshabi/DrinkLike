import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
    sourcemap: process.env.NODE_ENV === 'development',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://129.204.147.27:8090',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // 抑制依赖项的弃用警告
        silenceDeprecations: ['legacy-js-api', 'global-builtin'], // 抑制特定的弃用警告
      },
    },
  },
  plugins: [uni()],
})
