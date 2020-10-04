<template>
  <div class="">
    <h1>Dashboard</h1>
    <div
      v-if="favoriteDevices.length > 0"
      class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4"
    >
      <Card
        v-for="device in favoriteDevices"
        :key="device.id"
        :bulbs="[device]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import Card from "@/components/Card.vue";

export default defineComponent({
  components: {
    Card,
  },

  setup() {
    const store = useStore();
    const favoriteDevices = computed(() => store.state.dashboard.devices);
    return { favoriteDevices };
  },
});
</script>
