<template>
  <div class="bg-toolbar rounded-xl p-4 ">
    <div class="flex items-center justify-between mb-4 min-h-1/2 flex-grow-0">
      <div class="flex items-center">
        <span class="w-6 h-6 bg-primary rounded-full flex-shrink-0" />
        <span class="text-lg ml-4  ">{{
          loadedBulbs[0].name || "Unnamed Device"
        }}</span>
      </div>
      <toggle-button @action="setPower" :power="loadedBulbs[0].power" />
    </div>
    <verticle-slider
      class="w-full"
      :color="loadedBulbs[0].rgb"
      @action="setBright"
      :bright="loadedBulbs[0].bright"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import ToggleButton from "./ToggleButton.vue";
import VerticleSlider from "./VerticleSlider.vue";

type Bulb = {
  id: string;
  name: string;
  power: boolean;
  bright: number;
  connected: boolean;
  hsb: {};
  rgb: {};
};

export default defineComponent({
  props: {
    bulbs: { type: Array as PropType<Bulb[]>, required: true },
  },
  components: { ToggleButton, VerticleSlider },
  setup(props) {
    const store = useStore();
    const loadedBulbs = computed(() => props.bulbs);

    const setPower = ({ value }) => {
      store.dispatch("bulbs/setPower", {
        bulbs: loadedBulbs.value,
        power: value,
      });
    };
    const setBright = value => {
      store.dispatch("bulbs/setBright", {
        bulbs: loadedBulbs.value,
        bright: value.value,
      });
    };

    return { setPower, loadedBulbs, setBright };
  },
});
</script>
