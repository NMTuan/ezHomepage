<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-21 16:46:05
 * @LastEditTime: 2022-10-25 20:17:34
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: /ezHomepage/pages/create/index.vue
-->
<template>
    <BaseDialog :title="$t('pages.create.title')">
        <form action="" @submit.prevent="handleSubmit">
            <BaseInput v-model="formData.name" :placeholder="$t('pages.create.name')" />
            <BaseInput v-model="formData.url" :placeholder="$t('pages.create.url')" />
            <BaseInput v-model="tags" :placeholder="$t('pages.create.tags')" />
            <BaseButton class="flex-1 bg-sky-500/50" hover="bg-sky-500" :loading="loading">
                {{$t('pages.create.submit')}}
            </BaseButton>
        </form>
    </BaseDialog>
</template>
<script setup>
const directus = useDirectus()
const formData = ref({
    name: '',
    url: ''
})
const tags = ref('')
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
        name: formData.value.name,
        url: formData.value.url,
        tags: formatedTags.value,
        date_updated: new Date().toISOString()
    }
    loading.value = true
    directus.items('bookmarks').createOne(data)
        .then(() => {
            loading.value = false
            navigateTo({
                name: 'index',
                replace: true,
            })
        })
        .catch((error) => {
            loading.value = false
            alert(error)
        })

}


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
