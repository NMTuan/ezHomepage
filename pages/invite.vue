<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-24 10:37:22
 * @LastEditTime: 2022-10-24 14:38:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\pages\invite.vue
-->
<template>
    <div>
        <!-- 激活 -->
        <template v-if="inviteToken">
            <form @submit.prevent="handleCreate" class="p-3">
                <BaseInput :modelValue="inviteToken" disabled />
                <BaseInput v-model="password" type="password" placeholder="password" />
                <BaseButton class="flex-1 bg-sky-500/50 text-white" hover="bg-sky-500" :loading="loading">
                    Create Account
                </BaseButton>
            </form>
        </template>
        <!-- 发邀请 -->
        <template v-else>
            <form @submit.prevent="sendInvite" class="p-3">
                <BaseInput v-model="email" placeholder="email" />
                <BaseButton class="flex-1 bg-sky-500/50 text-white" hover="bg-sky-500" :loading="loading">
                    Send Invitation
                </BaseButton>
            </form>
            <div class="text-center text-sm text-neutral-500">
                Already have an account?
                <NuxtLink class="text-sky-500/50" hover="text-sky-500" :to="{name: 'login'}">Sign In</NuxtLink>
            </div>

        </template>

    </div>
</template>
<script setup>
definePageMeta({
    layout: "login",
    check: false
});
const route = useRoute()
const directus = useDirectus()
const email = ref('')
const password = ref('')
const inviteToken = ref('')
const loading = ref(false)


// 发邀请
const sendInvite = () => {
    if (!email.value.trim()) {
        alert('请输入邮箱')
        return
    }
    loading.value = true
    directus.users.invites.send(email.value.trim(), 'f50522a2-37d5-45a9-9f34-a648f23944b9', 'http://localhost:3344/invite')
        // res:{access_token:string, expires:number, refresh_token:string}
        .then((res) => {
            loading.value = false
            alert('邀请已发出，请查收邮件。')
        })
        // error:string 错误信息
        .catch((error) => {
            loading.value = false
            alert(error)
        })
}

// 注册
const handleCreate = () => {
    if (!password.value) {
        alert('请输入密码')
        return
    }
    loading.value = true
    directus.users.invites.accept(inviteToken.value, password.value)
        .then((res) => {
            loading.value = false
            alert('账号创建成功！')
            navigateTo({
                name: 'login',
                replace: true
            })
        })
        // error:string 错误信息
        .catch((error) => {
            loading.value = false
            alert(error)
        })
}


onMounted(() => {
    inviteToken.value = route.query.token
})

</script>
