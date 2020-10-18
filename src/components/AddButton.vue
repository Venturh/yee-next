<template>
  <button
    class="flex items-center px-2 space-x-1 border outline-none rounded-xl border-primary "
  >
    <span class="">Add <slot /></span>
    <icon class="fill-current text-primary" :icon="icon" :size="iconSize" />
  </button>
</template>

<script>
import Icon from "./Icon.vue";
export default {
  props: {
    icon: {
      type: String,
      default: "add",
    },
    iconSize: {
      type: Number,
      default: 5,
    },
  },

  components: { Icon },
};
</script>

<style></style>
