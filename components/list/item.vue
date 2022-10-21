<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 16:25:23
 * @LastEditTime: 2022-10-21 15:49:58
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\list\item.vue
-->
<template>
    <div class="
    px-4 py-3 
    cursor-pointer 
    rounded
    text-white
    transition-all
    " :class="itemClassNames" @click="handleClick">
        <div class="flex mb-2">
            <div class=" flex-1 truncate">
                {{item.name}}
                <sup class="text-white/50">{{item.clicks_count}}</sup>
            </div>
            <NuxtLink :to="{name: 'edit-id', params: {
                id: item.id
            }}" class="
            ml-1 flex items-center
            rounded w-6 h-6 text-center
            " hover="bg-sky-800/50" v-show="active" @click.stop="">
                <div class="i-ri-pencil-fill text-white/50 transition-all
                mx-auto
                ">
                </div>
            </NuxtLink>
        </div>
        <div class="flex items-center">
            <div class="flex items-center text-neutral-400">
                <div v-for="tag in item.tags" class="text-xs mr-2 px-3 py-1 rounded bg-neutral-800/50">
                    {{tag.tags_name}}
                </div>
            </div>
            <div class="truncate text-sm transition-all" :class="urlClassName">
                {{item.url}}
            </div>
        </div>
        <!-- <a class="
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
        </NuxtLink> -->
    </div>
</template>
<script setup lang="ts">
const directus = useDirectus()
const props = defineProps({
    item: {
        type: Object,
        default() {
            return {}
        }
    },
    active: {
        type: Boolean,
        default: false
    }
})

const itemClassNames = computed(() => {
    const className = []
    if (props.active) {
        className.push('bg-sky-500/50')
    } else {
        className.push('bg-transparent')
    }
    return className
})

const urlClassName = computed(() => {
    const className = []
    if (props.active) {
        className.push('text-neutral-300')
    } else {
        className.push('text-neutral-500')
    }
    return className
})

const handleClick = () => {
    // 打开
    window.open(props.item.url)

    // 次数+1，同时更新下编辑时间，列表要根据编辑时间排序
    directus.items('clicks').createOne({
        bookmark_id: props.item.id
    })
        .then(() => {
            return directus.items('bookmarks').updateOne(props.item.id, {})
        })
    // .then(res => {
    //     console.log('res', res);
    // })


    // directus.items('bookmarks').readOne(props.item.id, {
    //     fields: ['clicks']
    // })
    //     .then((res) => {
    //         return directus.items('bookmarks').updateOne(props.item.id, {
    //             clicks: parseInt(res.clicks) + 1
    //         })
    //     })
    //     .then((res) => {
    //         if (res.clicks !== undefined) {
    //             props.item.clicks = res.clicks
    //         }
    //     })
}
</script>
