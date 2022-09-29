<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-09-28 17:54:47
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\layouts\default.vue
-->
<template>
    <div>
        <NuxtLink to="/">[index]</NuxtLink>
        <NuxtLink to="/page">[page]</NuxtLink>
        <NuxtLink to="/tags">[tags]</NuxtLink>
        <slot />
    </div>
</template>
