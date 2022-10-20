<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-20 17:09:24
 * @LastEditTime: 2022-10-20 17:28:14
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\base\dialog.vue
-->
<template>
    <div class="text-neutral-300">
        <div class="absolute inset-0 z-10 bg-neutral-900/80" @click="clickMask">
            <BaseSimplebar class="h-full overflow-hidden">
                <div class="bg-neutral-600 mx-auto my-12vh overflow-hidden rounded p-4
                    w-90%
                    sm:w-80%
                    md:w-70% 
                    lg:w-50%
                    " @click.stop="clickContainer">
                    <div class="flex items-center text-lg">
                        <div class="flex-1">
                            {{ title }}
                        </div>
                        <div class="i-ri-close-line cursor-pointer
                            hover:text-violet-400
                            " @click="clickCloseIcon">
                        </div>
                    </div>
                    <div class="my-6">
                        <slot />
                    </div>
                    <div v-if="$slots.foot">
                        <slot name="foot" :close="close" />
                    </div>
                </div>
            </BaseSimplebar>
        </div>
    </div>
</template>
<script setup>
const router = useRouter()
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
// const emits = defineEmits([
//     'update:show'
// ])
const close = () => {
    // emits('update:show', false)
    router.back()
}
const clickMask = () => {
    close()
}
const clickCloseIcon = () => {
    close()
}
const clickContainer = () => {
    return
}
</script>
