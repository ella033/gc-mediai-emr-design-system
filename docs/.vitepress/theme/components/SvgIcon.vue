<script setup>
const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 16 },
  // color: null이면 기존 동작 (검정 + dark에서 invert)
  // 'currentColor' 또는 'red' 같은 문자열이면 CSS mask로 색 적용
  color: { type: String, default: null },
})
</script>

<template>
  <img
    v-if="!color"
    :src="`/icons/${name}.svg`"
    :width="size"
    :height="size"
    :alt="name"
    class="svg-icon"
  />
  <span
    v-else
    :style="{
      width: size + 'px',
      height: size + 'px',
      maskImage: `url(/icons/${name}.svg)`,
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      maskSize: 'contain',
      WebkitMaskImage: `url(/icons/${name}.svg)`,
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      WebkitMaskSize: 'contain',
      backgroundColor: color,
    }"
    class="svg-icon-masked"
    :aria-label="name"
  />
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
.dark .svg-icon { filter: invert(1); }

.svg-icon-masked {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
