<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 16:25:23
 * @LastEditTime: 2022-09-30 17:10:00
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\list\item.vue
-->
<template>
    <div class="
    flex items-center
    leading-none
    p-1">
        <a class="
        text-blue-400
        no-underline
        " :href="item.url">
            {{item.name}}
        </a>
        <ListTag v-for="tag in item.tags" :tag="tag"></ListTag>
        <NuxtLink :to="{name: 'edit-id', params: {
            id: item.id
        }}" class="
        ml-1
        ">
            [edit]
        </NuxtLink>
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
