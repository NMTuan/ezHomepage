<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-24 20:00:57
 * @LastEditTime: 2022-10-24 21:52:04
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: /ezHomepage/pages/options.vue
-->
<template>
    <div>
        <div class="
            flex items-center justify-center
            absolute top-3 right-3
            text-neutral-500
            w-6 h-6 rounded
            cursor-pointer
        " hover="bg-neutral-500 text-white" @click="navigateTo({name: 'login'})">
            <div class="i-ri-arrow-left-right-line"></div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-3">
            <BaseInput v-model="host" placeholder="host" />
            <BaseInput v-model="token" placeholder="static token" />
            <BaseButton class="flex-1 bg-sky-500/50 text-white" hover="bg-sky-500" :loading="loading">
                Login with self-hosted
            </BaseButton>
        </form>
        <div class="text-center text-sm text-neutral-500">
            Documents
        </div>

    </div>
</template>
<script setup>
definePageMeta({
    layout: 'login',
    check: false
})
const host = ref('')
const token = ref('')
const loading = ref(false)

const handleSubmit = () => {

}
</script>
