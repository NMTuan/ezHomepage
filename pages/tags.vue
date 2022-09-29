<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 17:53:47
 * @LastEditTime: 2022-09-29 10:40:44
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\tags.vue
-->
<template>
    <div>
        <h1>tags</h1>
        <pre>{{data}}</pre>
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
