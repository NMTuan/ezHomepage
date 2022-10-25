<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-21 20:08:15
 * @LastEditTime: 2022-10-25 16:52:32
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\layouts\login.vue
-->
<template>
    <div>
        <div v-if="mode" class="
                flex items-center justify-center
                absolute top-3 right-3
                text-neutral-500 
                h-6 rounded
                cursor-pointer
                px-1
                select-none
            " hover="bg-neutral-500 text-white" @click="navigateTo({ name: 'login' })">
            <div class="i-ri-cloud-fill"></div>
            <div class="text-xs mx-1">CLOUD</div>
        </div>
        <div v-else class="
                flex items-center justify-center
                absolute top-3 right-3
                text-neutral-500 
                h-6 rounded
                cursor-pointer
                px-1
                select-none
            " hover="bg-neutral-500 text-white" @click="navigateTo({ name: 'self-hosted' })">
            <div class="i-ri-server-fill"></div>
            <div class="text-xs mx-1">SELF-HOSTED</div>
        </div>
        <div class="pt-40 pb-16">
            <img class="block mx-auto" src="~/assets/images/icon128.png" alt="">
        </div>
        <slot />
    </div>
</template>
<script setup>
const route = useRoute()

// 存一下当前使用的模式。
const selfHostedMode = useCookie('selfHostedMode', {
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})

const mode = computed(() => {
    return route.name === 'self-hosted'
})

watchEffect(() => {
    selfHostedMode.value = mode.value
})
</script>
