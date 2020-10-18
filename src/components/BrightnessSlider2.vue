<template>
  <input
    class="z-10 bg-red-400 rounded-lg outline-none"
    :style="{ '--size': size, '--r': color.r, '--g': color.g, '--b': color.b }"
    type="range"
    v-model="brightness"
    @input="setBrightness"
  />
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    device: Object,
    color: Object,
    size: { type: String, default: "1.75em" },
  },

  setup(props) {
    const store = useStore();
    const brightness = ref(props.device[0].bright);
    const setBrightness = () => {
      store.dispatch("bulbs/setBright", {
        bulbs: props.device,
        bright: brightness.value,
      });
    };

    watch(
      () => props.device[0].bright,
      value => {
        brightness.value = value;
      }
    );
    return { brightness, setBrightness };
  },
});
</script>

<style scoped>
input[type="range"] {
  appearance: none;

  @apply bg-toolbar;
  overflow: hidden;
}
input[type="range"]::-webkit-slider-thumb {
  height: var(--size);
  width: var(--size);
  -webkit-appearance: none;
  appearance: none;
  box-shadow: calc(var(--size) * -13) 0 0 calc(var(--size) * 12.5)
    rgb(var(--r), var(--g), var(--b));
  cursor: pointer;
  @apply bg-transparent;
}
</style>
