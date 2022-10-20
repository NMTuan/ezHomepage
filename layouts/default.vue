<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-10-20 17:14:20
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\layouts\default.vue
-->
<template>
    <div class="
    flex flex-col
    h-full overflow-hidden
    bg-neutral-700
    ">
        <div class="
        flex
        items-center
        flex-shrink-0
        bg-neutral-500
        rounded
        m-3
        ">
            <input type="text" placeholder="keyword" v-model="q" class="
            text-white
            flex-grow bg-transparent px-4 py-3 outline-none
            " />
            <div class="
            flex items-center justify-center
            w-6 h-6 mr-4 
            text-white/50 
            rounded
            cursor-pointer
            " hover="bg-neutral-600/30">
                <div class="i-ri-more-fill"></div>
            </div>
        </div>
        <BaseSimplebar class="
        flex-1 overflow-hidden
        relative
        m-3 mt-0
        ">
            <ListItem v-for="(item, index) in data" :item="item" :active="index === active"
                @mouseenter="handleActive(index)"></ListItem>
        </BaseSimplebar>
        <slot />
    </div>
</template>
<script setup lang="ts">
const directus = useDirectus()
const data = ref([])
const active = ref(0)
const q = ref('')

const handleActive = (index) => {
    active.value = index
}

const queryFilter = computed(() => {
    if (q.value === '') {
        return {}
    }
    return {
        _or: [
            {
                name: {
                    _contains: q.value
                }
            },
            {
                url: {
                    _contains: q.value
                }
            },
            {
                tags: {
                    'tags_name': {
                        _contains: q.value
                    }
                }
            }
        ]
    }
})

const fetch = () => {
    directus.items('bookmarks').readByQuery({
        meta: '*',
        fields: [
            'id',
            'name',
            'url',
            // 'date_updated',
            'tags.*',
            'count(clicks)',
            // 'clicks.*'
        ],
        filter: queryFilter.value,
        // sort: ['clicks.date_created']
        sort: ['-date_updated']
    })
        .then(res => {
            data.value = res.data
        })
}

watchEffect(() => {
    fetch()
})

</script>
