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
        class="inline-block w-6 h-6 text-white fill-current"
      />
    </div>

    <div class="flex flex-col items-center w-full ">
      <router-link
        v-for="item in menuItems"
        :to="`/${item.text.toLowerCase()}`"
        :key="item.text"
        @click="setSelected(item.text)"
        class="bottom-0 flex items-center w-10/12 p-2 my-4 rounded-lg cursor-pointer  last:absolute"
        :class="[
          selected === item.text ? 'bg-body ' : '',
          expanded ? '' : 'justify-center',
        ]"
      >
        <Icon class="fill-current text-primary" :icon="item.icon" />
        <p class="ml-2 text-lg text-white" v-if="expanded">{{ item.text }}</p>
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
};

export default defineComponent({
  name: "Sidebar",
  components: { Icon },
  setup() {
    const menuItems: MenuItem[] = [
      {
        text: "Dashboard",
        icon: "home",
      },
      {
        text: "Devices",
        icon: "home",
      },
      { text: "Rooms", icon: "rooms" },
      {
        text: "Scenes",
        icon: "scenes",
      },
      {
        text: "Settings",
        icon: "settings",
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
