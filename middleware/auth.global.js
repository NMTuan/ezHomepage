/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 11:49:40
 * @LastEditTime: 2022-09-28 16:04:57
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\middleware\auth.global.js
 */

export default defineNuxtRouteMiddleware(async (to, form) => {
    const directus = useDirectus()
    const token = await directus.auth.token
    console.log('[token]', token)

    // 非登录页 && 没有 token
    if (to.name !== 'login' && !token) {
        return navigateTo({ name: 'login' })
    }
    // 登录页 && 有 token
    if (to.name === 'login' && token) {
        return navigateTo({ name: 'index' })
    }
})
