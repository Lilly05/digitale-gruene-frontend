<template>
  <div class="input-wrapper">
    <label for="input" class="label" :class="{'focused-label': !!text, 'unfocused-label': !text}">{{ label }} {{ required ? '*' : ''}}</label>
    <input id="input" class="input" v-model="text" :class="{'focused': focused, 'success': !!text && !error, 'error': error}" @input="onFirstInput" @focusin="setFocused" @focusout="setUnfocused">
  </div>
</template>

<script setup lang="ts">
import {computed, type Ref, ref} from "vue";

const props = defineProps<{
  label: string,
  required?: boolean,
  error?: boolean
}>();

const text = defineModel({type: String});

const touched: Ref<boolean> = ref(false);
const focused: Ref<boolean> = ref(false);

const onFirstInput = () => touched.value = true;
const setFocused = () => focused.value = true;
const setUnfocused = () => focused.value = false;

const error = computed(() => props.error && touched.value);
</script>

<style scoped lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/caligraphy.scss";

.input {
  width: 100%;
  color: $color-gray;
  background: #f4f4f4;
  padding: .75rem;
  border-radius: 2px;
  border: none;
  border-bottom: 2px solid $color-green; /* Set default border color to green */
  margin-top: 1rem;
  margin-bottom: .75rem;
  font-size: 1rem;
  outline: none;
  cursor: text;
}

.focused {
  border-bottom: 2px solid $color-gray;
}

.success {
  border-bottom: 2px solid $color-green;
}

.error {
  border-bottom: 2px solid $color-error;
}

.label {
  transition: all 200ms;
  pointer-events: none;
}

.unfocused-label {
  position: absolute;
  margin-top: 1rem;
  padding: .75rem;
}

.focused-label {
  position: absolute;
  font-size: .75em;
  font-weight: bold;
  transform: translateX(4px) translateY(-4px);
}

@media screen and (max-width: 1030px) {
  .input {
    width: 95%;
  }
}
</style>
