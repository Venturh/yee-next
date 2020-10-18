<template>
  <basic-overlay @swatch="addSwatchItem" category="Color" :hasInput="false">
    <color-picker
      @action="setColor"
      colorType="rgb"
      type="Wheel"
      :value="color"
    />
  </basic-overlay>
</template>

<script lang="ts">
import { useState } from "@/hooks/useState";
import BasicOverlay from "@/components/Overlays/BasicOverlay.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import { useStore } from "vuex";
import { SwatchItem } from "@/store/dashboard/state";
export default {
  components: {
    BasicOverlay,
    ColorPicker,
  },

  setup(props, { emit }) {
    const [color, setColor] = useState({ r: 255, g: 255, b: 31 });
    const store = useStore();
    const addSwatchItem = () => {
      emit("back");
      const Swatch: SwatchItem = {
        type: "rgb",
        color: color,
      };
      store.commit("dashboard/addSwatchItem", Swatch);
    };

    const removeSwatchItem = () => {
      store.commit("dashboard/removeSwatchItem", {
        type: "rgb",
        color: color,
      });
    };
    return { color, setColor, addSwatchItem, removeSwatchItem };
  },
};
</script>

<style></style>
