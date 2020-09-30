<template>
  <div
    class="relative bg-accent h-screen"
    :class="[expanded ? 'w-64' : 'w-16']"
  >
    <div
      class="flex  mt-4"
      :class="[expanded ? 'justify-between px-2' : 'justify-center']"
    >
      <p class="text-white" v-if="expanded">Welcome</p>
      <Icon
        icon="arrow-push-right"
        v-if="!expanded"
        @click="setExpanded"
        class="fill-current text-white inline-block w-6 h-6"
      />

      <Icon
        icon="arrow-push-left"
        v-if="expanded"
        @click="setExpanded"
        class="fill-current text-white inline-block w-6 h-6"
      />
    </div>

    <div class="w-full flex flex-col items-center  ">
      <router-link
        v-for="item in menuItems"
        :to="`/${item.text.toLowerCase()}`"
        :key="item.text"
        @click="setSelected(item.text)"
        class=" flex items-center  my-4 p-2 w-10/12 rounded-lg cursor-pointer last:absolute bottom-0"
        :class="[
          selected === item.text ? 'bg-body ' : '',
          expanded ? '' : 'justify-center',
        ]"
      >
        <Icon class="text-primary fill-current" :icon="item.icon" />
        <p class="text-white text-lg ml-2" v-if="expanded">{{ item.text }}</p>
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
