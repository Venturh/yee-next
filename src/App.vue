<template>
  <div class="flex">
    <Sidebar :sidebarItems="sidebarItems" />
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
import { computed, ref, watch } from "vue";

type SidebarItem = {
  text: string;
  route: string;
  icon: string;
  dropdown: boolean;
  dropdownItems?: DropdownItem[];
};

type DropdownItem = {
  text: string;
  route: string;
  icon: string;
  dropdown: boolean;
};

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

    const sidebarItems = ref<SidebarItem[]>([
      {
        text: "Dashboard",
        route: "/dashboard",
        icon: "dashboard",
        dropdown: false,
      },
      {
        text: "Devices",
        route: "/devices",
        icon: "devices",
        dropdown: true,
      },
      {
        text: "Rooms",
        route: "/rooms",
        icon: "rooms",
        dropdown: true,
      },
      {
        text: "Scenes",
        route: "/scenes",
        icon: "scenes",
        dropdown: false,
      },
      {
        text: "Settings",
        route: "/settings",
        icon: "settings",
        dropdown: false,
      },
    ]);

    const loadedDevices = computed(() => store.state.bulbs.devices);

    const loading = computed(() => store.state.bulbs.loading);
    const dropdownDeviceItems = ref<DropdownItem[]>([]);

    watch(loading, () => {
      dropdownDeviceItems.value = [];
      loadedDevices.value.map(item => {
        const obj = {
          text: item.name,
          route: "/device/" + item.id,
          icon: "bulb",
          dropdown: false,
        };
        return dropdownDeviceItems.value.push(obj);
      });
      sidebarItems.value[1].dropdownItems = dropdownDeviceItems.value;
    });

    return { sidebarItems };
  },
};
</script>
