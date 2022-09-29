<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 11:21:50
 * @LastEditTime: 2022-09-29 16:52:45
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\tags\[id].vue
-->
<template>
    <div>
        <h2>tag detail</h2>
        <ListItem v-for="item in data" :item="item"></ListItem>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const directus = useDirectus()
const data = ref([])
const meta = ref({})

directus.items('bookmarks').readByQuery({
    filter: {
        tags: {
            tags_name: id
        }
    },
    fields: '*.*',
    meta: '*'
}).then(res => {
    data.value = res.data
    meta.value = res.meta
})

</script>
