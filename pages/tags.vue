<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 17:53:47
 * @LastEditTime: 2022-09-29 14:41:17
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\tags.vue
-->
<template>
    <div>
        <h1>tags</h1>
        <div v-for="item in data">
            <NuxtLink :to="{
                name: 'tags-id',
                params: {
                    id: item.tags_name
                }
            }">{{item.tags_name}}</NuxtLink>
            {{item.count}}
        </div>
        <NuxtChild></NuxtChild>
    </div>
</template>
<script setup lang="ts">
const directus = useDirectus()
const data = ref([])

directus.items('bookmarks_tags').readByQuery({
    groupBy: [
        'tags_name',
    ],
    aggregate: {
        count: '*'
    }
})
    .then(res => {
        data.value = res.data
    })
</script>
