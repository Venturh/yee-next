<template>
  <div class="">
    <h1>Dashboard</h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",

  setup() {
    const store = useStore();
    const devices = computed(() => store.state.bulbs.devices);
    return { devices };
  },
});
</script>
