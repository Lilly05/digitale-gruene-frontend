<template>
  <div class="checkbox" @click="toggleChecked" :class="{'checked': checked}">
    <p class="x">X</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(false);
const emit = defineEmits(['clicked']);

function toggleChecked() {
  checked.value = !checked.value;
  emit('clicked', checked.value);
}
</script>

<style scoped lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/caligraphy.scss";

.checkbox {
  margin: 0;
  border: 3px solid $color-pink;
  width: 8px;
  height: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checked {
  background: $color-pink;
}

.x {
  font-size: 8px;
  margin: 0;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-weight: bolder;
  pointer-events: none;
  user-select: none;
  text-align: center;
}
</style>
