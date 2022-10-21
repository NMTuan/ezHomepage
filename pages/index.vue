<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2022-10-21 16:54:41
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\index.vue
-->
<script setup>

// 处理快捷键
const handleKeydown = (e) => {
    const ctrlKey = e.ctrlKey || e.metaKey
    if (e.key === 'd' && (ctrlKey || e.altKey)) {
        e.preventDefault()
        navigateTo({
            name: 'create'
        })
    }
}

// 在当前页 注册快捷键
onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

// 离开当前页 注销快捷键
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>
