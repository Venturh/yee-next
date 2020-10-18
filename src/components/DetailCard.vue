<template>
  <div class="p-4 rounded-xl bg-toolbar">
    <nav class="flex justify-between ">
      <div class="flex space-x-4">
        <h2
          @click="setSelectedItem(item)"
          v-for="item in navItems"
          :key="item"
          class="font-bold cursor-pointer"
          :class="selectedItem === item ? 'text-primary' : 'text-white'"
        >
          {{ item }}
        </h2>
      </div>
      <add-button @click="$emit('toggle', cardType)">
        {{ cardType }}</add-button
      >
    </nav>
    <div class="flex flex-col px-4 h-3/4">
      <slot v-if="selectedItem === navItems[0]" name="first" />
      <slot v-if="selectedItem === navItems[1]" name="second" />
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";

import AddButton from "./AddButton.vue";

export default {
  components: {
    AddButton,
  },
  props: {
    navItems: {
      type: Array as () => Array<string>,
      default: () => [],
    },
    cardType: {
      type: String,
      default: "",
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
