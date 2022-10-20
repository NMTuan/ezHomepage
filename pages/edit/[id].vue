<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-30 16:57:21
 * @LastEditTime: 2022-10-20 17:23:01
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\edit\[id].vue
-->
<template>
    <BaseDialog title="编辑">
        <form action="" @submit.prevent="handleSubmit">
            <p>
                <input type="text" autocomplete="off" placeholder="site title" v-model="title">
            </p>
            <p>
                <input type="text" autocomplete="off" placeholder="site url" v-model="url">
            </p>
            <p>
                <input type="text" autocomplete="off" placeholder="tags" v-model="tags">
                （中英文逗号或空格都会分割 tag）
                <br>{{formatedTags}}
            </p>
            <p><input type="submit" value="submit"></p>
        </form>
        <div v-for="i in 100">{{i}}</div>
    </BaseDialog>
</template>
<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const id = route.params.id
const directus = useDirectus()
const title = ref('')
const url = ref('')
const tags = ref('')
const deleteTagsId = ref([])    // 要移除的tagsId
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

const handleSubmit = () => {
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
    directus.items('bookmarks').updateOne(id, data)
        .then(() => {
            navigateTo(router.options.history.state.back)
        })
}

directus.items('bookmarks').readOne(id, {
    fields: '*.*'
})
    .then(res => {
        title.value = res.name
        url.value = res.url
        tags.value = res.tags.reduce((total, item) => {
            deleteTagsId.value.push(item.id)
            total.push(item.tags_name)
            return total
        }, []).join(' ')
    })
</script>

<style lang="scss" scoped>
input {
    @apply border w-full p-2;
}
</style>
