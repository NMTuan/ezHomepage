<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 16:30:21
 * @LastEditTime: 2022-09-29 16:39:51
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\list\tag.vue
-->
<template>
    <span> #{{tag.tags_name}}</span>
</template>
<script setup lang="ts">
const props = defineProps({
    tag: {
        type: Object,
        default() {
            return {}
        }
    }
})
</script>
