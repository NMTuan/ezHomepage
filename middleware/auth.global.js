/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 11:49:40
 * @LastEditTime: 2022-10-25 16:54:20
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\middleware\auth.global.js
 */

export default defineNuxtRouteMiddleware(async (to, form) => {
    const directus = useDirectus()
       const selfHostedMode = useCookie('selfHostedMode', {
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    })

    const token = await directus.auth.token
    console.log('[token]', token)
    // console.log('[to]', to.meta.check)

    // 如果 meta.check === false 则不检测权限
    // 如果不是 false && 没找到 token，则跳转至登录页
    if (to.meta.check !== false && !token) {
        return navigateTo({ name: selfHostedMode.value ? 'self-hosted':'login' })
    }
})
