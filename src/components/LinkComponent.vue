<template>
  <span class="link">
    <span class="selected">
      <slot />
    </span>
  </span>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
@import "../styles/colors.scss";
@import "../styles/caligraphy.scss";

.link {
  border-bottom: 4px solid $color-green-link;
  cursor: pointer;
  transition: 50ms all;

  &:hover {
    border-bottom: 4px solid transparent;

    .selected {
      height: 100%;
      width: 100%;
      background: $color-green-link;
      padding: 0 0 4px 0;
      transition: 50ms all;
    }
  }
}
</style>
