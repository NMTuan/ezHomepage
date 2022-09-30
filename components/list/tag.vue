<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 16:30:21
 * @LastEditTime: 2022-09-30 17:03:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\list\tag.vue
-->
<template>
    <span class="
    bg-orange-400
    px-2 py-1 ml-1
    rounded
    text-sm text-orange-50 leading-none 
    ">
        #{{tag.tags_name}}
    </span>
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
