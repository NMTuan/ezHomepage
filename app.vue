<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2022-10-23 12:27:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: /ezHomepage/app.vue
-->
<template>
  <div class="bg-neutral-700">
    <!-- <button @click="handleLogout">logout</button> -->
    <!-- <div text="5xl sky" m="x-auto b-2" class="i-ri-global-line">
    </div>
    <div bg="sky" p="y-2" border="rounded-lg" text="white" m="t-2">
      hello world
    </div>
    <div class="flex justify-center py-4">
      <ChangeLanguage />
      <ToggleDark />
    </div>
    <div bg="yellow-100 dark:yellow-900" p="4" text="sky-400 dark:green-200">
      {{ $t('menu.home') }}
    </div> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">

const directus = useDirectus()
// 设定默认语言
// const { locale } = useI18n()
// const i18nCookie = useCookie('i18n')
// if (i18nCookie.value) {
//   locale.value = i18nCookie.value
// }

// 登出
const handleLogout = async () => {
  await directus.auth.logout()
  navigateTo({ name: 'login' })
}
</script>
<style lang="scss">
html,
body,
#__nuxt,
#__nuxt>div {
  @apply h-full overflow-hidden;
}
</style>
