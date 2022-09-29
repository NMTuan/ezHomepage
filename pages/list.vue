<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:37:19
 * @LastEditTime: 2022-09-29 16:51:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\list.vue
-->
<template>
    <div>
        <h1>list</h1>
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
