<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 16:25:23
 * @LastEditTime: 2022-10-18 16:09:53
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
    " :class="itemClassNames">
        <div class="flex mb-2">
            <div class=" flex-1 truncate">
                {{item.name}}
            </div>
            <NuxtLink :to="{name: 'edit-id', params: {
                id: item.id
            }}" class="
                    ml-1 flex items-center
                    " v-show="active">
                <div class="i-ri-pencil-fill text-neutral-400 transition-all
                hover:text-neutral-100
                "></div>
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

</script>
