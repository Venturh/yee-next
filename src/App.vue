<template>
  <div class="flex">
    <Sidebar />
    <div
      class="w-screen h-screen bg-body text-white  pt-12 px-12 md:px-24 xl:px-48"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";

import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "App",
  components: { Sidebar },
  setup() {
    const store = useStore();
    const isDiscovering = computed(() => store.state.bulbs.discovering);
    const discover = () => {
      store.dispatch("bulbs/discovery");
    };

    if (isDiscovering.value === false) {
      discover();
    }
  },
};
</script>
