<template>
  <div class="flex">
    <Sidebar />
    <div
      class="w-screen h-screen px-12 pt-12 text-white bg-body md:px-12 xl:px-24 xxl:px-48"
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
    return {};
  },
};
</script>
