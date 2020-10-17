<template>
  <div
    class="h-screen space-y-12 transition-all duration-300 ease-in-out bg-accent"
    :class="[expanded ? 'w-64' : 'w-16']"
  >
    <div
      class="flex mt-12 "
      :class="[expanded ? 'justify-between px-2' : 'justify-center']"
    >
      <p class="text-white" v-if="expanded">Welcome Max</p>
      <Icon
        icon="arrow-push-right"
        v-if="!expanded"
        @click="setExpanded"
        class="inline-block w-6 h-6 text-white fill-current"
      />

      <Icon
        icon="arrow-push-left"
        v-if="expanded"
        @click="setExpanded"
        class="inline-block w-6 h-6 text-white"
      />
    </div>

    <div ref="linksRef" class="flex flex-col">
      <verticle-menu :menuItems="sidebarItems" :expanded="expanded">
        <template v-slot:dropdown="{ menuItems }">
          <verticle-menu
            :menuItems="menuItems"
            :defaultSelected="-1"
            :expanded="expanded"
          />
        </template>
      </verticle-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Icon from "@/components/Icon.vue";
import VerticleMenu from "./VerticleMenu.vue";

export default defineComponent({
  name: "Sidebar",
  components: { Icon, VerticleMenu },

  props: {
    sidebarItems: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const expanded = ref(true);

    const setExpanded = () => {
      expanded.value = !expanded.value;
    };

    return {
      expanded,
      setExpanded,
    };
  },
});
</script>
