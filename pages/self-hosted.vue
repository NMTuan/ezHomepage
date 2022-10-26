<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-24 20:00:57
 * @LastEditTime: 2022-10-26 17:28:19
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\self-hosted.vue
-->
<template>
    <div>
        <form @submit.prevent="handleSubmit" class="p-3">
            <BaseInput v-model="host" :placeholder="$t('pages.selfHosted.host')" />
            <BaseInput v-model="token" :placeholder="$t('pages.selfHosted.token')" />
            <BaseButton class="flex-1 bg-sky-500/50 text-white" hover="bg-sky-500" :loading="loading">
                {{ $t('pages.selfHosted.submit') }}
            </BaseButton>
        </form>
        <div class="text-center text-sm text-neutral-500">
            {{ $t('pages.selfHosted.tip') }}
            <a href="#" target="_blank" class="text-sky-500/50" hover="text-sky-500">
                {{ $t('pages.selfHosted.link') }}
            </a>
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
            handleCollections()
        })
        .catch(error => {
            alert(error)
        })
}

// 处理表
const handleCollections = async () => {
    const res = await directus.items('directus_collections').readByQuery({
        limit: -1,
    })
    console.log('[res]', res);
    const bookmark_exits = res.data.find(item => item.collection === 'bookmark')
    if (!bookmark_exits) {
        directus.items('directus_collections').createOne({
            "collection": "bookmarks",
            "meta": {
                "collection": "bookmarks",
                "icon": null,
                "note": null,
                "display_template": null,
                "hidden": false,
                "singleton": false,
                "translations": null,
                "archive_field": "status",
                "archive_app_filter": true,
                "archive_value": "archived",
                "unarchive_value": "draft",
                "sort_field": "sort",
                "accountability": "all",
                "color": null,
                "item_duplication_fields": null,
                "sort": 1,
                "group": null,
                "collapse": "open"
            }
        })
    }

}
</script>
