<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-29 17:13:47
 * @LastEditTime: 2022-09-30 17:50:02
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\add.vue
-->
<template>
    <div>
        <h1>add</h1>
        <form action="" @submit.prevent="handleSubmit">
            <p>
                <input type="text" autocomplete="off" placeholder="site title" v-model="title">
            </p>
            <p>
                <input type="text" autocomplete="off" placeholder="site url" v-model="url">
            </p>
            <p>
                <input type="text" autocomplete="off" placeholder="tags" v-model="tags">
                {{formatedTags}}
                （中英文逗号或空格都会分割 tag）
                <br>{{formatedTags}}
            </p>
            <p><input type="submit" value="submit"></p>
        </form>
        <div>

        </div>
    </div>
</template>
<script setup lang="ts">
const router = useRouter()
const directus = useDirectus()
const title = ref('')
const url = ref('')
const tags = ref('')

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
    console.log('[submit]', formatedTags);
    if (!title.value || !url.value) {
        return
    }

    directus.items('bookmarks').createOne({
        name: title.value,
        url: url.value,
        tags: formatedTags.value
    })
        .then(() => {
            navigateTo(router.options.history.state.back)
        })


}
</script>
