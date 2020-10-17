<template>
  <main class="w-full h-full " v-if="!loading">
    <div class="flex items-center justify-between ">
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
    <div
      class="flex flex-col space-y-6 xxl:h-3/4 xxl:flex-row xxl:justify-between xxl:space-x-4 xxl:space-y-0 "
    >
      <detail-card class="xxl:w-1/2" :navItems="['Color', 'ColorTemp']">
        <template v-slot:first>
          <color-picker
            @action="setColor"
            colorType="rgb"
            type="Wheel"
            :value="color"
          />
        </template>
        <template v-slot:second>
          <color-picker
            @action="setCt"
            name="second"
            colorType="kelvin"
            :sliderShape="true"
            type="Slider"
            v-model="device.kelvin"
          />
        </template>
      </detail-card>

      <detail-card class="xxl:w-1/2" :navItems="['Scenes']">
        <template v-slot:first>
          <h1>Scenes</h1>
        </template>
      </detail-card>
    </div>
    <brightness-slider-2
      class="w-1/2"
      size="2.5rem"
      :device="[device]"
      :color="device.rgb"
    />
  </main>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, Ref, ref, watch } from "vue";

import Favorize from "@/components/Favorize.vue";
import PowerToggle from "@/components/PowerToggle.vue";
import DetailCard from "@/components/DetailCard.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import BrightnessSlider2 from "@/components/BrightnessSlider2.vue";
import { Device } from "@/types";
import { setFavoriteStorage } from "@/services/bulb";

export default {
  components: {
    Favorize,
    PowerToggle,
    DetailCard,
    ColorPicker,
    BrightnessSlider2,
  },

  setup() {
    const route = useRoute();
    const { params } = useRoute();
    const store = useStore();
    const { id } = params;

    const devices = computed(() => store.state.bulbs.devices);
    const favDevices = computed(() => store.state.dashboard.devices);
    const device: Ref<Device> = ref(
      devices.value.find(device => device.id === id) || {}
    );
    const loading = computed(() => store.state.bulbs.loading);
    const color = ref(device.value.rgb || {});

    const checkIsFavorite = valId => {
      return favDevices.value.findIndex(device => device.id === valId) !== -1;
    };

    const isFavorite = ref(checkIsFavorite(device.value.id));

    const setFavorite = () => {
      isFavorite.value = !isFavorite.value;
      store.dispatch(
        "dashboard/setDevices",
        setFavoriteStorage(device, "favDevices")
      );
    };

    const setColor = newColor => {
      color.value = newColor;
      store.dispatch("bulbs/setRgb", { bulbs: [device.value], rgb: newColor });
    };

    const setCt = ct => {
      console.log("setup -> ct", ct);
      store.dispatch("bulbs/setRgb", { bulbs: [device.value], rgb: ct });
    };

    watch(loading, () => {
      device.value = devices.value[0];
      color.value = device.value.rgb;
    });

    watch(
      () => route.params,
      newParams => {
        device.value =
          devices.value.find(device => device.id === newParams.id) || {};
        isFavorite.value = checkIsFavorite(device.value.id);
      }
    );

    return { device, setFavorite, isFavorite, color, setColor, setCt, loading };
  },
};
</script>
