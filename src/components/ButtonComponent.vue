<template>
  <button @click="onClick" :class="{'button': true, 'normal': type !== 'inverted', 'inverted': type === 'inverted', 'disabled': disabled}">
    <slot />
  </button>
</template>
<script lang="ts" setup>

const props = defineProps<{
  type: 'normal' | 'inverted'
  disabled?: boolean
}>()

const emit = defineEmits(['click']);

const onClick = () => emit('click')

</script>
<style lang="scss" scoped>
@import "../styles/colors.scss";

.button {
  box-shadow: none;
  padding: 12px 16px;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 0;
  font-family: 'Arial', 'Helvetiva', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 200ms;
  
  &:hover {
    cursor: pointer;
  }
}

.normal {
  color: white;
  background: $color-pink;
  border: none;

  &:hover {
    background: $color-pink-active;
  }
}

.inverted {
  color: $color-pink;
  border: 1px solid $color-pink;
  background: white;

  &:hover {
    background: $color-pink;
    color: white;
    border: 1px solid white;
  }
}

.disabled {
  pointer-events: none;
  background: $color-pink-disabled !important;
}
</style>
