<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-10-24 17:25:07
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
        <BaseInput ref="el" placeholder="keyword" v-model="q" class="m-3">
            <template #append>
                <div class="
            flex items-center justify-center
            w-6 h-6 mr-4 
            text-white/50 
            rounded
            relative
            group
            " hover="bg-neutral-600/30">
                    <div class="i-ri-more-fill"></div>
                    <div class="
                    absolute right-0 top-6 z-10
                    bg-neutral-600
                    shadow-lg
                    rounded overflow-hidden
                    text-sm
                    hidden
                    py-2
                    group-hover:block
                    children:whitespace-nowrap 
                    children:px-3 
                    children:py-2
                    children:cursor-pointer
                    hover:children:text-white
                    hover:children:bg-sky-500/50
                    ">
                        <div>Options</div>
                        <div @click="handleLogout">Logout</div>
                    </div>
                </div>
            </template>
        </BaseInput>
        <BaseSimplebar ref="simplebar" class="
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
const route = useRoute()
const directus = useDirectus()
const data = ref([])
const active = ref(0)   // 高亮项目
const el = ref(null)    // 搜索框
const q = ref('')   // 关键字
const simplebar = ref(null)

// 处理高亮
const handleActive = (index) => {
    active.value = index
}

// 过滤参数
// TODO 空格分割条件；井号匹配标签
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

// 拉取数据
const fetch = () => {
    directus.items('bookmarks').readByQuery({
        meta: '*',
        fields: [
            'id',
            'name',
            'url',
            // 'date_updated',
            // 'date_created',
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

// 登出
const handleLogout = async () => {
    await directus.auth.logout()
    navigateTo({ name: 'login' })
}

// 自动重载数据
// 1. 当路由回到首页
// 2. 当 queryFilter 变更
watchEffect(() => {
    if (route.name === 'index') {
        fetch()
        if (simplebar.value) {
            simplebar.value.scrollTop()
        }
    }
})

// 自动焦点(首次加载页面)
onMounted(() => {
    el.value.focus()
})

// 自动焦点(每次回到首页)
watch(route, () => {
    if (route.name === 'index') {
        el.value.focus()
    }
})
</script>
