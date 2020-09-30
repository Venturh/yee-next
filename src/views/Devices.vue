<template>
  <div>
    <h1>Devices</h1>
    <div
      class="grid gap-4 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  xxl:grid-cols-4"
    >
      <Card v-for="device in devices" :key="device.id" :bulbs="[device]" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import Card from "@/components/Card.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const store = useStore();
    const devices = computed(() => store.state.bulbs.devices);
    return { devices };
  },
});
</script>
