<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-18 14:17:18
 * @LastEditTime: 2022-10-18 16:28:15
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\base\simplebar.vue
-->
<template>
    <div>
        <div ref="element" class="h-full w-full">
            <slot />
        </div>
    </div>
</template>
<script setup>
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

const element = ref(null)
onMounted(() => {
    const simpleBar = new SimpleBar(element.value, {
        timeout: 500
    })
})
</script>
<style>
.simplebar-scrollbar:before {
    @apply bg-neutral-500;
}
</style>
