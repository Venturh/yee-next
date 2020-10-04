<template>
  <div
    @click.self="linkToDevice"
    :to="'/device/' + loadedBulbs[0].id"
    class="p-4 bg-toolbar rounded-xl "
  >
    <div class="flex items-center justify-between flex-grow-0 mb-4 min-h-1/2">
      <div class="flex items-center">
        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary" />
        <span class="ml-4 text-lg ">{{
          loadedBulbs[0].name || "Unnamed Device"
        }}</span>
      </div>
      <power-toggle :device="loadedBulbs" />
    </div>
    <brightness-slider
      class="w-full"
      :color="loadedBulbs[0].rgb"
      :device="loadedBulbs"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import PowerToggle from "./PowerToggle.vue";
import BrightnessSlider from "./BrightnessSlider.vue";
import { useRouter } from "vue-router";

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
  components: { PowerToggle, BrightnessSlider },
  setup(props) {
    const router = useRouter();
    const loadedBulbs = computed(() => props.bulbs);

    const linkToDevice = () => {
      router.push("/device/" + loadedBulbs.value[0].id);
    };

    return { loadedBulbs, linkToDevice };
  },
});
</script>
