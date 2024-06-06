<template>
  <h3>Du hast {{ minutes }} Minuten und {{ seconds }} Sekunden gebraucht um das Formular auszufüllen</h3>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTimerStore } from "@/store/timer";

const timerStore = useTimerStore();
const seconds = ref(0);
const minutes = ref(0);

onMounted(() => {
  let time = timerStore.finalTime;
  let totalSeconds = time / 1000;
  minutes.value = Math.floor(totalSeconds / 60);
  seconds.value = Math.floor(totalSeconds % 60);
});
</script>

<style scoped lang="scss">
</style>
