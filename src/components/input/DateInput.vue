<template>
  <div class="input-wrapper">
    <label for="input" class="label">{{ label }} {{ required ? '*' : ''}}</label>
    <input id="input" class="input" v-model="text" :class="inputClasses" type="date" :max="maxDate" @input="onFirstInput" @focusin="setFocused" @focusout="setUnfocused">
  </div>
</template>

<script setup lang="ts">
import { defineModel, defineProps, ref, computed } from "vue";

const props = defineProps<{
  label: string
  required?: boolean
}>();

const text = defineModel({ type: String });
const touched = ref(false);
const focused = ref(false);
const today = new Date().toISOString().split('T')[0]; // Heutiges Datum im ISO-Format (YYYY-MM-DD)

const onFirstInput = () => touched.value = true;
const setFocused = () => focused.value = true;
const setUnfocused = () => focused.value = false;

const inputClasses = computed(() => ({
  focused: focused.value,
  success: !!text.value && !error.value,
  error: error.value || (!text.value && touched.value)
}));

const error = computed(() => {
  if (!props.required) return false;
  if (!text.value) return true;
  const selectedDate = new Date(text.value);
  const todayDate = new Date(today);
  return selectedDate > todayDate;
});

const maxDate = today; // Setze maximales Datum auf heute
</script>

<style scoped lang="scss">
@import "../../styles/colors.scss"; // Importiere die Datei, die die Farbvariablen definiert

.input-wrapper {
  margin-top: 1rem;
}

.input {
  width: 100%;
  color: $color-gray; // Verwende die definierte Farbvariable
  background: #f4f4f4;
  padding: .75rem;
  border-radius: 2px;
  border: none;
  border-bottom: 2px solid #e2e2e2;
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
  border-bottom: 2px solid $color-green;
}

.label {
  transition: all 200ms;
  pointer-events: none;
  position: absolute;
  font-weight: bold;
  font-size: .75em;
  transform: translateX(4px) translateY(-4px);
}

@media screen and (max-width: 1030px) {
  .input {
    width: 95%;
  }
}
</style>

