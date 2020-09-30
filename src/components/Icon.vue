<template>
  <div
    v-html="require(`../assets/icons/${icon}.svg`)"
    class=" h-6 w-6 inline-block "
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
  },
});
</script>
