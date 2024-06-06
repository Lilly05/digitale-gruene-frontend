<template>

  <router-view />
</template>
<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";

const videoId: Ref<string> = ref('none')

onMounted(() => {

})
</script>
<style scoped>
</style>
