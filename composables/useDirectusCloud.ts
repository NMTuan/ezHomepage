/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-27 17:36:38
 * @LastEditTime: 2022-10-26 16:32:01
 * @LastEditors: NMTuan
 * @Description: 云版配置，供云般的 登录/注册 使用
 * @FilePath: \ezHomepage\composables\useDirectusCloud.ts
 */
import { Directus } from '@directus/sdk'

export default () => {
    const config = useRuntimeConfig()

    // 如果配置了url，则用本地配置的，否者用全局配置
    const directus = new Directus(config.public.apiUrl, {
        auth: {
            // 如果不指定 mode，则 logout() 等操作会报错。
            // https://github.com/directus/directus/discussions/10027#discussioncomment-3624778
            mode: 'json'
        }
    })

    return directus
}
