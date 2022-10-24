<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-22 15:29:20
 * @LastEditTime: 2022-10-24 14:31:03
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\components\base\input.vue
-->
<template>
    <div class="
        flex
        items-center
        flex-shrink-0
        bg-neutral-500
        rounded
        mb-3
    ">
        <div if="$slots.prepend">
            <slot name="prepend" />
        </div>
        <input ref="el" class="
        text-white
        flex-grow
        bg-transparent
        px-4 py-3
        outline-none
        " :class="{
            'cursor-not-allowed': disabled,
            'text-neutral-300': disabled
        }" :type="type" :placeholder="placeholder" :autocomplete="autocomplete" v-model="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" :disabled="disabled">
        <div v-if="$slots.append">
            <slot name="append" />
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:modelValue'])
const el = ref(null)
const autocomplete = computed(() => {
    return props.type === 'password' ? 'current-password' : 'off'
})

const focus = () => {
    el.value.focus()
}
defineExpose({ focus })

</script>
