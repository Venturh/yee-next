<template>
  <div class="rounded-xl bg-toolbar">
    <nav class="flex p-4">
      <h2
        @click="setSelectedItem(item)"
        v-for="item in navItems"
        :key="item"
        class="mr-4 font-bold cursor-pointer"
        :class="selectedItem === item ? 'text-primary' : 'text-white'"
      >
        {{ item }}
      </h2>
    </nav>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
export default {
  props: {
    navItems: {
      type: Array as () => Array<string>,
      default: () => [],
    },
  },
  setup(props) {
    const selectedItem: Ref<string> = ref(props.navItems[0]);
    const setSelectedItem = (item: string) => {
      selectedItem.value = item;
    };
    return { selectedItem, setSelectedItem };
  },
};
</script>
