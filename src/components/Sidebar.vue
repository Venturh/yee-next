<template>
  <div
    class="relative h-screen bg-accent"
    :class="[expanded ? 'w-64' : 'w-16']"
  >
    <div
      class="flex mt-4"
      :class="[expanded ? 'justify-between px-2' : 'justify-center']"
    >
      <p class="text-white" v-if="expanded">Welcome</p>
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

    <div class="flex flex-col items-center w-full ">
      <router-link
        v-for="item in menuItems"
        :to="`/${item.text.toLowerCase()}`"
        :key="item.text"
        @click="setSelected(item.text)"
        class="relative bottom-0 flex items-center w-full p-2 my-4 rounded-lg cursor-pointer j last:absolute"
        :class="[
          selected === item.text ? 'text-primary ' : 'text-white',
          expanded ? '' : 'justify-center',
        ]"
      >
        <div class="flex ml-4">
          <span
            class="absolute left-0 w-1 h-6 rounded-xl bg-primary"
            v-if="selected === item.text"
          />
          <Icon :icon="item.icon" :size="6" />
          <p class="ml-2 text-lg" v-if="expanded">{{ item.text }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Icon from "@/components/Icon.vue";

type MenuItem = {
  text: string;
  icon: string;
  dropdown: boolean;
};

export default defineComponent({
  name: "Sidebar",
  components: { Icon },
  setup() {
    const menuItems: MenuItem[] = [
      {
        text: "Dashboard",
        icon: "home",
        dropdown: false,
      },
      {
        text: "Devices",
        icon: "home",
        dropdown: true,
      },
      { text: "Rooms", icon: "rooms", dropdown: true },
      {
        text: "Scenes",
        icon: "scenes",
        dropdown: false,
      },
      {
        text: "Settings",
        icon: "settings",
        dropdown: false,
      },
    ];

    const expanded = ref(true);
    const selected = ref("Dashboard");

    const setExpanded = () => {
      expanded.value = !expanded.value;
    };

    const setSelected = (name: string) => {
      selected.value = name;
    };

    return { menuItems, expanded, selected, setSelected, setExpanded };
  },
});
</script>
