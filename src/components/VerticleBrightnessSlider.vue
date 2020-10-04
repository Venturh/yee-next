//Todo: make it dynamic with other component
<template>
  <input
    class="outline-none b-gray-400 "
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
        bright: props.device[0].bright.value,
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
  transform: rotateZ(270deg);
  @apply bg-body;
  border-radius: 1em;
  overflow: hidden;
}
input[type="range"]::-webkit-slider-thumb {
  height: 0;
  width: 0;
  -webkit-appearance: none;
  appearance: none;
  box-shadow: calc(var(--size) * -13) 0 0 calc(var(--size) * 12.5)
    rgb(var(--r), var(--g), var(--b));
  border-radius: 50%;
  cursor: pointer;
  @apply bg-white;
}
</style>
