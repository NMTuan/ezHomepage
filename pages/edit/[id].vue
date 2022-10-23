<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-30 16:57:21
 * @LastEditTime: 2022-10-21 16:17:23
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\edit\[id].vue
-->
<template>
    <BaseDialog title="编辑">
        <form action="" @submit.prevent="handleSubmit">
            <BaseInput v-model="title" placeholder="site name" />
            <BaseInput v-model="url" placeholder="site url" />
            <BaseInput v-model="tags" placeholder="tags（中英文逗号或空格都会分割 tag）" />
            <div class="flex">
                <BaseButton class="flex-1 bg-sky-500/50" hover="bg-sky-500" :loading="loading">submit</BaseButton>
                <BaseButton class="ml-3 bg-red-500/50" hover="bg-red-800" type="button" @click="handleDelete">
                    <div class="i-ri-delete-bin-5-line text-lg"></div>
                </BaseButton>
            </div>
        </form>
        <NuxtPage />
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
        .catch((error) => {
            loading.value = false
            alert(error)
        })

}

// 拉取数据
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

// 删除操作
const handleDelete = () => {
    navigateTo({
        name: 'edit-id-delete',
        id: id,
        state: {
            title: title.value,
            url: url.value
        }
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
