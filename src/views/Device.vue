<template>
  <main class="h-full space-y-4 " v-if="!loading">
    <div class="flex items-center justify-between ">
      <div>
        <div class="flex items-center ">
          <span class="mr-2 text-3xl">{{ device.name }}</span>
          <favorize @action="setFavorite" :isFavorite="isFavorite" />
        </div>
        <span
          >{{ device.power ? "On" : "Off" }} • {{ device.bright }}% Brightness
        </span>
      </div>
      <power-toggle :device="[device]" bg="toolbar" />
    </div>
    <div
      class="flex flex-col w-full space-y-5 h-11/12 lxl:h-3/4 lxl:flex-row lxl:space-y-0 lxl:space-x-8 "
    >
      <div class="h-3/4 lxl:h-full lxl:space-y-4 lxl:w-2/4">
        <detail-card
          class="h-full lxl:h-11/12"
          :navItems="['Color', 'ColorTemp']"
          cardType="Color"
          @toggle="setShowColorOverlay(!showColorOverlay)"
        >
          <template v-slot:first>
            <color-picker
              class="self-center"
              @action="setColor"
              colorType="rgb"
              type="Wheel"
              :value="color"
            />
            <color-swatch class="" />
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
        <brightness-slider-2
          class="hidden w-full lxl:block"
          size="2.5rem"
          :device="[device]"
          :color="device.rgb"
        />
      </div>

      <brightness-slider-2
        class=" lxl:hidden"
        size="4rem"
        :device="[device]"
        :color="device.rgb"
      />
      <detail-card
        class=" h-3/4 lxl:h-full lxl:w-1/2"
        :navItems="['Scenes']"
        cardType="Scene"
      >
        <template v-slot:first>
          <h1>Scenes</h1>
        </template>
      </detail-card>
    </div>
    <new-color-overlay
      v-if="showColorOverlay"
      class="absolute top-0 right-0 "
      @back="setShowColorOverlay(!showColorOverlay)"
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
import ColorSwatch from "@/components/ColorSwatch.vue";
import NewColorOverlay from "@/components/Overlays/NewColorOverlay.vue";
import { Device } from "@/types";
import { setFavoriteStorage } from "@/services/bulb";
import { useState } from "@/hooks/useState";

export default {
  components: {
    Favorize,
    PowerToggle,
    DetailCard,
    ColorPicker,
    BrightnessSlider2,
    ColorSwatch,
    NewColorOverlay,
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

    watch(
      () => route.params,
      newParams => {
        device.value =
          devices.value.find(device => device.id === newParams.id) || {};
        isFavorite.value = checkIsFavorite(device.value.id);
      }
    );

    const [showColorOverlay, setShowColorOverlay] = useState(false);

    return {
      device,
      setFavorite,
      isFavorite,
      color,
      setColor,
      setCt,
      loading,
      showColorOverlay,
      setShowColorOverlay,
    };
  },
};
</script>
