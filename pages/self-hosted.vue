<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-24 20:00:57
 * @LastEditTime: 2022-10-28 16:33:19
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\self-hosted.vue
-->
<template>
    <div>
        <form @submit.prevent="handleSubmit" class="p-3">
            <BaseInput v-model="host" :placeholder="$t('pages.selfHosted.host')" />
            <BaseInput v-model="email" :placeholder="$t('pages.login.email')" />
            <BaseInput v-model="password" type="password" :placeholder="$t('pages.login.password')" />
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
const email = ref('')
const password = ref('')
const loading = ref(false)

const hostCookie = useCookie('ezHomepage_host', {
    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})

if (hostCookie.value) {
    host.value = hostCookie.value
}

const handleSubmit = () => {
    if (!email.value || !password.value) {
        alert('请输入邮箱或密码')
        return
    }

    directus = new Directus(host.value, {
        auth: {
            mode: 'json'
        }
    })

    directus.auth.login({
        email: email.value.trim(),
        password: password.value
    })
        .then(res => {
            // 登录成功， 记录 host 信息
            hostCookie.value = host.value
            window.location.href = '/'
        })
        .catch(error => {
            alert(error)
        })
}

// 处理表
// const handleCollections = async () => {
//     console.log('[db]', db);
//     const { data: collections } = await directus.items('directus_collections').readByQuery()
//     const { data: fields } = await directus.items('directus_fields').readByQuery()
//     console.log('x', collections, fields);

//     // 循环表，不存在的抽出来，下一步进行创建
//     const no_exist_collections = db.collections.reduce((total, item) => {
//         if (!collections.find(i => i.collection === item.collection)) {
//             total.push(item)
//         }
//         return total
//     }, [])
//     console.log('[no_exist_collections]', no_exist_collections);
//     if (no_exist_collections.length > 0) {
//         await directus.items('directus_collections').createMany(no_exist_collections)
//     }

//     // 按表循环字段, 由于不支持多数据插入，所以直接循环单插
//     Object.keys(db.fields).forEach(async (c) => {
//         db.fields[c].reduce(async (total, item) => {
//             if (!fields.find(i => i.collection === item.collection && i.field === item.field)) {
//                 // total.push(item)

//                 await directus.items(`directus_fields/${c}`).createOne(item)
//             }
//             return total
//         }, [])
//     })

//     // const no_exist_collections = []
//     // for (let i = 0; i < collections.length; i++){
//     //     if (res.data.find(item => item.collection === collections[i].collection) === undefined) {
//     //         await directus.items('directus_collections').create
//     //     }
//     // }
//     // const bookmark_exits = res.data.find(item => item.collection === 'bookmark')
//     // if (!bookmark_exits) {
//     // await directus.items('directus_collections').createOne({
//     //     "collection": "bookmarks",
//     //     "meta": {
//     //         "collection": "bookmarks",
//     //         // "icon": null,
//     //         // "note": null,
//     //         // "display_template": null,
//     //         // "hidden": false,
//     //         // "singleton": false,
//     //         // "translations": null,
//     //         // "archive_field": "status",
//     //         // "archive_app_filter": true,
//     //         // "archive_value": "archived",
//     //         // "unarchive_value": "draft",
//     //         // "sort_field": "sort",
//     //         // "accountability": "all",
//     //         // "color": null,
//     //         // "item_duplication_fields": null,
//     //         // "sort": 1,
//     //         // "group": null,
//     //         // "collapse": "open"
//     //     },
//     //     "schema": {
//     //         "name": "bookmarks"
//     //     }
//     // })
//     // await directus.items('directus_fields/bookmarks').createOne({
//     //     collection: 'bookmarks',
//     //     field: 'status',
//     //     type: 'string',
//     //     "schema": {
//     //         "name": "status",
//     //         "table": "bookmarks",
//     //         "data_type": "varchar",
//     //         "default_value": "published",
//     //         "generation_expression": null,
//     //         "max_length": 255,
//     //         "numeric_precision": null,
//     //         "numeric_scale": null,
//     //         "is_generated": false,
//     //         "is_nullable": true,
//     //         "is_unique": false,
//     //         "is_primary_key": false,
//     //         "has_auto_increment": false,
//     //         "foreign_key_column": null,
//     //         "foreign_key_table": null,
//     //         "comment": ""
//     //     },
//     //     "meta": {
//     //         "id": 13,
//     //         "collection": "bookmarks",
//     //         "field": "status",
//     //         "special": null,
//     //         "interface": "select-dropdown",
//     //         "options": {
//     //             "choices": [{
//     //                 "text": "$t:published",
//     //                 "value": "published"
//     //             }, {
//     //                 "text": "$t:draft",
//     //                 "value": "draft"
//     //             }, {
//     //                 "text": "$t:archived",
//     //                 "value": "archived"
//     //             }]
//     //         },
//     //         "display": "labels",
//     //         "display_options": {
//     //             "showAsDot": true,
//     //             "choices": [{
//     //                 "text": "$t:published",
//     //                 "value": "published",
//     //                 "foreground": "#FFFFFF",
//     //                 "background": "var(--primary)"
//     //             }, {
//     //                 "text": "$t:draft",
//     //                 "value": "draft",
//     //                 "foreground": "#18222F",
//     //                 "background": "#D3DAE4"
//     //             }, {
//     //                 "text": "$t:archived",
//     //                 "value": "archived",
//     //                 "foreground": "#FFFFFF",
//     //                 "background": "var(--warning)"
//     //             }]
//     //         },
//     //         "readonly": false,
//     //         "hidden": false,
//     //         "sort": null,
//     //         "width": "full",
//     //         "translations": null,
//     //         "note": null,
//     //         "conditions": null,
//     //         "required": false,
//     //         "group": null,
//     //         "validation": null,
//     //         "validation_message": null
//     //     }

//     // })
//     // await directus.items('directus_fields').createMany([
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'status',
//     //         tpe: 'string'
//     //     },
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'sort',
//     //         tpe: 'integer'
//     //     },
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'date_created',
//     //         tpe: 'timestamp'
//     //     },
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'date_updated',
//     //         tpe: 'timestamp'
//     //     },
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'name',
//     //         tpe: 'string'
//     //     },
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'url',
//     //         tpe: 'string'
//     //     },
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'tags',
//     //         tpe: 'alias'
//     //     },
//     //     {
//     //         colection: 'bookmarks',
//     //         field: 'clicks',
//     //         tpe: 'alias'
//     //     },
//     // ])
//     // }

// }
</script>
