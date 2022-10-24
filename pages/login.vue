<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 11:55:28
 * @LastEditTime: 2022-10-24 14:40:29
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\login.vue
-->
<template>
    <div>
        <form @submit.prevent="handleSubmit" class="p-3">
            <BaseInput v-model="email" placeholder="email" />
            <BaseInput v-model="password" type="password" placeholder="password" />
            <BaseButton class="flex-1 bg-sky-500/50 text-white" hover="bg-sky-500" :loading="loading">
                Login
            </BaseButton>
        </form>
        <div class="text-center text-sm text-neutral-500">
            Don't have an account?
            <NuxtLink class="text-sky-500/50" hover="text-sky-500" :to="{name: 'invite'}">Register for Free</NuxtLink>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "login",
    check: false
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
        alert('请输入邮箱或密码')
        return
    }
    loading.value = true

    directus.auth.login({
        email: email.value.trim(),
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
