<template>
  <div
    v-html="require(`../assets/icons/${icon}.svg`)"
    :class="`inline-block  fill-current h-${size} w-${size}`"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 6,
    },
  },
});
</script>
