<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-21 14:52:40
 * @LastEditTime: 2022-10-25 20:38:00
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: /ezHomepage/pages/edit/[id]/delete.vue
-->
<template>
    <BaseDialog :title="$t('pages.delete.title')" close-on-click-mask>
        <p v-html="$t('pages.delete.content', {
            title: state.title
        })" />
        <template #foot="{close}">
            <div class="flex justify-end mt-8">
                <button @click="close" class="h-11 px-4 py-3 rounded cursor-pointer leading-5 flex-shrink-0"
                    hover="bg-neutral-500/30">
                    {{$t('pages.delete.cancel')}}
                </button>
                <button @click="handleDelete"
                    class=" h-11 px-4 py-3 rounded cursor-pointer leading-5 flex-shrink-0 bg-red-500/50 ml-3"
                    hover="bg-red-800">
                    <div v-if="loading" class="i-ri-loader-4-fill animate-spin mx-auto text-lg"></div>
                    <div v-else>{{$t('pages.delete.submit')}}</div>
                </button>
            </div>
        </template>
    </BaseDialog>
</template>
<script setup>
const route = useRoute()
const id = route.params.id
const directus = useDirectus()
const state = ref({
    title: '',
    url: ''
})
const loading = ref(false)

// 删除操作
const handleDelete = () => {
    loading.value = true
    directus.items('bookmarks').deleteOne(id.toString())
        .then(res => {
            loading.value = false
            navigateTo({
                name: 'index'
            })
        })
}

// 从 history 中找传参
onMounted(() => {
    state.value = history.state
})
</script>
