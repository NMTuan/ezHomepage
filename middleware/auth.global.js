/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 11:49:40
 * @LastEditTime: 2022-10-24 11:29:27
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\middleware\auth.global.js
 */

export default defineNuxtRouteMiddleware(async (to, form) => {
    const directus = useDirectus()
    const token = await directus.auth.token
    console.log('[token]', token)
    // console.log('[to]', to.meta.check)

    // 如果 meta.check === false 则不检测权限
    // 如果不是 false && 没找到 token，则跳转至登录页
    if (to.meta.check !== false && !token) {
        return navigateTo({ name: 'login' })
    }
})
