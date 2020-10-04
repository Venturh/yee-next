<template>
  <main class="h-full" v-if="device">
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center ">
          <h1 class="mr-2">{{ device.name }}</h1>
          <favorize @action="setFavorite" :isFavorite="isFavorite" />
        </div>
        <span class=""
          >{{ device.power ? "On" : "Off" }} • {{ device.bright }}% Brightness
        </span>
      </div>
      <power-toggle :device="[device]" bg="toolbar" />
    </div>
    <div class="flex justify-between w-full mt-6 space-x-4 min-h-1/2 ">
      <detail-card class="w-1/2" :navItems="['Color', 'ColorTemp']" />

      <detail-card class="w-1/2" :navItems="['Scenes']" />
    </div>
    <brightness-slider :device="[device]" :color="device.rgb" />
  </main>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

import Favorize from "@/components/Favorize.vue";
import PowerToggle from "@/components/PowerToggle.vue";
import DetailCard from "@/components/DetailCard.vue";
import BrightnessSlider from "@/components/BrightnessSlider.vue";
import { Device } from "@/types";
import { setFavoriteStorage } from "@/services/bulb";

export default {
  components: { Favorize, PowerToggle, DetailCard, BrightnessSlider },
  setup() {
    const router = useRouter();
    const { params } = useRoute();
    const store = useStore();
    const { id } = params;
    const devices = computed(() => store.state.bulbs.devices);
    const favDevices = computed(() => store.state.dashboard.devices);
    const device: Device = devices.value.find(device => device.id === id);
    const isFavorite =
      favDevices.value.findIndex(device => device.id === id) !== -1;

    const setFavorite = () => {
      store.dispatch(
        "dashboard/setDevices",
        setFavoriteStorage(device, "favDevices")
      );
    };
    //temp fix for stuff
    if (device === undefined) router.push("/");
    return { device, setFavorite, isFavorite };
  },
};
</script>
