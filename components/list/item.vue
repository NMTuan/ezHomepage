<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 16:25:23
 * @LastEditTime: 2022-09-29 16:31:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\list\item.vue
-->
<template>
    <div>
        <a :href="item.url">
            {{item.name}}
        </a>
        <ListTag v-for="tag in item.tags" :tag="tag"></ListTag>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object,
        default() {
            return {}
        }
    }
})

</script>
