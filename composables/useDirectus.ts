/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-27 17:36:38
 * @LastEditTime: 2022-09-28 17:09:15
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\composables\useDirectus.ts
 */
import { Directus } from '@directus/sdk'

export default () => {
    const config = useRuntimeConfig()
    const apiUrl = useCookie('ezHomepage_apiUrl', {
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    })

    // 如果配置了url，则用本地配置的，否者用全局配置
    const directus = new Directus(apiUrl.value || config.public.apiUrl, {
        auth: {
            // 如果不指定 mode，则 logout() 等操作会报错。
            // https://github.com/directus/directus/discussions/10027#discussioncomment-3624778
            mode: 'json'
        }
    })

    return directus
}
