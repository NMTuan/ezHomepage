<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 11:46:46
 * @LastEditTime: 2022-10-25 19:22:55
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: /ezHomepage/components/base/toggle-locales.vue
-->
<template>
    <div class="
            flex items-center justify-center
            h-6 rounded
            cursor-pointer
            px-1 ml-3
            select-none
        " hover="bg-neutral-500 text-white" @click="toggleLocales">
        <div class="i-ri-earth-fill"></div>
    </div>
</template>
<script setup lang="ts">
const { locale, availableLocales } = useI18n()
const locales = availableLocales
const i18nCookie = useCookie('i18n')

// 切换语言
const toggleLocales = () => {
    const language = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    i18nCookie.value = language
    locale.value = language
}

// 设置当前语言
locale.value = i18nCookie.value

</script>
