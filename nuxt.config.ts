/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2022-09-28 17:03:30
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\nuxt.config.ts
 */
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    modules: ['@unocss/nuxt', '@intlify/nuxt3', '@nuxtjs/color-mode'],
    unocss: {
        // presets
        uno: true, // enabled `@unocss/preset-uno`
        icons: true, // enabled `@unocss/preset-icons`
        attributify: true, // enabled `@unocss/preset-attributify`,
        transformers: [],
        shortcuts: [],
        rules: [],
        safelist: []
    },
    intlify: {
        localeDir: 'locales',
        vueI18n: {
            locale: 'zh-CN',
            fallbackLocale: 'zh-CN'
        }
    },
    colorMode: {
        classSuffix: ''
    },
    runtimeConfig: {
        public: {
            email: '', // 测试账号
            password: '', // 测试密码
            apiUrl: '' // 接口url
        }
    }
})
