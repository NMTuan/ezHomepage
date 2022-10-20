<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2022-10-20 16:34:42
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
            <input type="text" placeholder="keyword" v-model="q" class="
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
        </BaseSimplebar>
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
