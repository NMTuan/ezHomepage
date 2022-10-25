/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-27 17:36:38
 * @LastEditTime: 2022-10-25 16:50:23
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\composables\useDirectus.ts
 */
import { Directus } from '@directus/sdk'

export default () => {
    const config = useRuntimeConfig()

    const selfHostedMode = useCookie('selfHostedMode', {
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    })
    const host = useCookie('ezHomepage_host', {
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    })

    if (!host.value && !config.public.apiUrl) {
        alert('config error')
        return
    }

    // 如果配置了url，则用本地配置的，否者用全局配置
    const directus = new Directus(
        selfHostedMode.value ? host.value : config.public.apiUrl,
        {
            auth: {
                // 如果不指定 mode，则 logout() 等操作会报错。
                // https://github.com/directus/directus/discussions/10027#discussioncomment-3624778
                mode: 'json'
            }
        }
    )

    return directus
}
