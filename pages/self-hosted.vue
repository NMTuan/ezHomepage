<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-24 20:00:57
 * @LastEditTime: 2022-10-25 15:30:05
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\self-hosted.vue
-->
<template>
    <div>
        <form @submit.prevent="handleSubmit" class="p-3">
            <BaseInput v-model="host" placeholder="host" />
            <BaseInput v-model="token" placeholder="static token" />
            <BaseButton class="flex-1 bg-sky-500/50 text-white" hover="bg-sky-500" :loading="loading">
                Login with self-hosted
            </BaseButton>
        </form>
        <div class="text-center text-sm text-neutral-500">
            Documents
        </div>
        <!-- <div @click="handleLogout">logout</div> -->
    </div>
</template>
<script setup>
import { Directus } from '@directus/sdk'
let directus
definePageMeta({
    layout: 'login',
    check: false
})
const host = ref('')
const token = ref('')
const loading = ref(false)

const hostCookie = useCookie('ezHomepage_host', {
    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})

if (hostCookie.value) {
    host.value = hostCookie.value
}
// 登出
// const handleLogout = async () => {
//     await directus.auth.logout()
//     // navigateTo({ name: 'login' })
// }


const handleSubmit = () => {

    directus = new Directus(host.value, {
        auth: {
            mode: 'json'
        }
    })

    directus.auth.static(token.value)
        .then(res => {
            // 登录成功， 记录 host 信息
            hostCookie.value = host.value
            // directus.auth.resetStorage()
            // directus.auth.refresh();
            // window.location.href = '/'
            // directus.items('directus_collections').createOne({
            //     collection: 'test',
            //     schema: {}
            // })
directus.items('directus_collections').readByQuery({
            })
                .then(res => {
                console.log(res);
            })
        })
        .catch(error => {
        alert(error)
    })

}
</script>
