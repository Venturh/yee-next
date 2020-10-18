<template>
  <div class="grid grid-flow-col grid-rows-2 gap-2 mx-auto">
    <div v-for="color in swatch" :key="color.id">
      <div
        class="w-8 h-8 rounded-lg"
        :style="{
          background: `rgba(${color.color.r}, ${color.color.g}, ${color.color.b})`,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const swatch = computed(() => store.state.dashboard.swatch);
    return { swatch };
  },
};
</script>

<style></style>
