<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-28 11:55:28
 * @LastEditTime: 2022-09-28 17:11:00
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\login.vue
-->
<template>
    <div>
        <h1>login</h1>
        <form @submit.prevent="handleSubmit">
            <p>
                <input type="text" v-model="email" placeholder="email" autocomplete="off">
            </p>
            <p>
                <input type="password" v-model="password" placeholder="password" autocomplete="current-password">
            </p>
            <p>
                <button type="submit">login</button>
            </p>
        </form>
    </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const directus = useDirectus()
const email = ref('')
const password = ref('')

// 如果能从环境变量中找到配置项，则赋值
if (config.public.email) {
    email.value = config.public.email
}
if (config.public.password) {
    password.value = config.public.password
}


// 提交登录表单
const handleSubmit = async () => {
    if (!email.value || !password.value) {
        return
    }

    await directus.auth.login({
        email: email.value,
        password: password.value
    })
        // res:{access_token:string, expires:number, refresh_token:string}
        .then((res) => {
            console.log('[res]', res);
            navigateTo({ name: 'index' })
        })
        // error:string 错误信息
        .catch((error) => {
            alert(error)
        })

}
</script>
