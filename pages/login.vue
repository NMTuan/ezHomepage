<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 11:55:28
 * @LastEditTime: 2022-10-23 19:35:04
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: /ezHomepage/pages/login.vue
-->
<template>
    <div class="
        flex items-center justify-center
        absolute top-3 right-3
        text-neutral-500
        w-6 h-6 rounded
        cursor-pointer
    " hover="bg-neutral-500 text-white">
        <div class="i-ri-settings-4-fill"></div>
    </div>
    <div class="pt-40 pb-16">
        <img class="block mx-auto" src="~/assets/images/icon128.png" alt="">
    </div>
    <form @submit.prevent="handleSubmit" class="p-3">
        <BaseInput v-model="email" placeholder="email" />
        <BaseInput v-model="password" type="password" placeholder="password" />
        <BaseButton class="bg-sky-500/50 text-white" hover="bg-sky-500" :loading="loading">
            submit
        </BaseButton>
    </form>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "login",
});
const config = useRuntimeConfig()
const directus = useDirectus()
const email = ref('')
const password = ref('')
const loading = ref(false)

// 如果能从环境变量中找到配置项，则赋值
if (config.public.email) {
    email.value = config.public.email
}
if (config.public.password) {
    password.value = config.public.password
}


// 提交登录表单
const handleSubmit = () => {
    if (!email.value || !password.value) {
        return
    }
    loading.value = true

    directus.auth.login({
        email: email.value,
        password: password.value
    })
        // res:{access_token:string, expires:number, refresh_token:string}
        .then((res) => {
            loading.value = false
            navigateTo({ name: 'index' })
        })
        // error:string 错误信息
        .catch((error) => {
            loading.value = false
            alert(error)
        })

}
</script>
