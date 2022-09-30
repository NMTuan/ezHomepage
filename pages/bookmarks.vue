<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:37:19
 * @LastEditTime: 2022-09-29 17:13:25
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\bookmarks.vue
-->
<template>
    <div>
        <h1>bookmarks</h1>
        <ListItem v-for="item in data" :item="item"></ListItem>
    </div>
</template>
<script setup lang="ts">
const directus = useDirectus()
const data = ref([])
const meta = ref({})

directus.items('bookmarks').readByQuery({
    meta: '*',
    fields: '*.*'
})
    .then(res => {
        data.value = res.data
        meta.value = res.meta
    })
</script>
