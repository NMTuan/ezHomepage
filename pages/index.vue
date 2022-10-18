<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2022-10-18 16:37:02
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\index.vue
-->
<template>
    <div class="
    flex flex-col
    h-full overflow-hidden
    bg-neutral-700
    ">
        <div class="
        flex
        flex-shrink-0
        bg-neutral-500
        rounded
        m-3
        ">
            <input type="text" placeholder="keyword" class="
            text-white
            flex-grow bg-transparent px-4 py-3 outline-none
            " />
        </div>
        <BaseSimplebar class="
        flex-1 overflow-hidden
        relative
        m-3 mt-0
        ">
            <ListItem v-for="(item, index) in data" :item="item" :active="index === active"
                @mouseenter="handleActive(index)"></ListItem>
            <div v-for="i in 100">{{i}}</div>
        </BaseSimplebar>
    </div>
</template>
<script setup lang="ts">
const directus = useDirectus()
const data = ref([])
const active = ref(0)

const handleActive = (index) => {
    active.value = index
}

directus.items('bookmarks').readByQuery({
    meta: '*',
    fields: '*.*'
})
    .then(res => {
        data.value = res.data
    })
</script>
