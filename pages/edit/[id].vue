<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-30 16:57:21
 * @LastEditTime: 2022-10-21 14:32:45
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\edit\[id].vue
-->
<template>
    <BaseDialog title="编辑">
        <form action="" @submit.prevent="handleSubmit">
            <p>
                <input class="input" type="text" autocomplete="off" placeholder="site title" v-model="title">
            </p>
            <p>
                <input class="input" type="text" autocomplete="off" placeholder="site url" v-model="url">
            </p>
            <p>
                <input class="input" type="text" autocomplete="off" placeholder="tags（中英文逗号或空格都会分割 tag）" v-model="tags">
            </p>
            <p class="flex items-center">
                <button class=" h-11 px-4 py-3 rounded cursor-pointer leading-5 flex-grow bg-sky-500/50" type="submit">
                    <div v-if="loading" class="i-ri-loader-4-fill animate-spin mx-auto text-lg"></div>
                    <div v-else>submit</div>
                </button>
                <button class=" h-11 px-4 py-3 rounded cursor-pointer leading-5 flex-shrink-0 bg-red-500/50 ml-3">
                    <div class="i-ri-delete-bin-5-line text-lg"></div>
                </button>
            </p>
        </form>
    </BaseDialog>
</template>
<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const directus = useDirectus()
const title = ref('')
const url = ref('')
const tags = ref('')
const deleteTagsId = ref([])    // 要移除的tagsId
const loading = ref(false)

// 处理 输入框中的 tags
const formatedTags = computed(() => {
    return tags.value.replace(/\s/g, ' ')
        // 分割
        .split(/[,， ]/)
        // 去重
        .reduce((total, tag) => {
            // 存在且不重复
            if (tag && total.indexOf(tag) < 0) {
                total.push(tag)
            }
            return total
        }, [])
        // 整理数据格式
        // tags.name 为主键，因为想要它能自动创建或关联已存在数据。
        // 这里传参要注意，第一层为关联表中字段的名字，第二层为tags表的主键。
        .reduce((total, tag) => {
            total.push({
                tags_name: {
                    name: tag
                }
            })
            return total
        }, [])
})

// 提交表单
const handleSubmit = () => {
    if (loading.value) {
        return
    }
    const data = {
        name: title.value,
        url: url.value,
        // 这里粗暴一点
        // 把原来的所有 tagsId 都删掉
        // 然后把新的 tags 全部加进去
        tags: {
            create: formatedTags.value,
            delete: deleteTagsId.value
        }
    }
    loading.value = true
    directus.items('bookmarks').updateOne(id, data)
        .then(() => {
            loading.value = false
            navigateTo({
                // path: router.options.history.state.back,
                name: 'index',
                replace: true,
            })
        })
}

// 
const fetch = () => {
    loading.value = true
    directus.items('bookmarks').readOne(id.toString(), {
        fields: [
            'id',
            'name',
            'url',
            'tags.id',
            'tags.tags_name',
            // 'count(clicks)',
            // 'date_created',
            // 'date_updated'
        ]
    })
        .then(res => {
            loading.value = false
            title.value = res.name
            url.value = res.url
            tags.value = res.tags.reduce((total, item) => {
                deleteTagsId.value.push(item.id)
                total.push(item.tags_name)
                return total
            }, []).join(' ')
        })
}

fetch()
</script>

<style lang="scss" scoped>
.input {
    @apply w-full rounded p-3 mb-3;
    @apply bg-neutral-500;
    @apply outline-none;
    @apply text-white;
    // @apply hover-(bg-neutral-400);
}
</style>
