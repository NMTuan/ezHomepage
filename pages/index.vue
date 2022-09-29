<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2022-09-29 11:50:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\index.vue
-->
<template>
    <div>
        <pre>{{data}}</pre>
    </div>
</template>
<script setup lang="ts">
const directus = useDirectus()
const data = ref([])

directus.items('bookmarks_tags').readByQuery({
    // fields: '*.*'
})
    .then(res => {
        data.value = res.data
    })

</script>
