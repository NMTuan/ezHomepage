<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-22 17:20:26
 * @LastEditTime: 2022-10-24 09:37:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\base\button.vue
-->
<template>
    <div class="
        flex
        items-center
        flex-shrink-0
        rounded
    ">
        <button class="
        h-11 px-4 py-3 rounded leading-5 flex-grow
        flex items-center justify-center
        " :class="{'cursor-not-allowed': loading, 'cursor-pointer': !loading}" :type="type" :disabled="loading">
            <div v-if="loading" class="i-ri-loader-4-fill animate-spin mx-auto text-lg"></div>
            <slot v-else />
        </button>
    </div>

</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'submit'
    },
    loading: {
        type: Boolean,
        defautl: false
    }
})
</script>
