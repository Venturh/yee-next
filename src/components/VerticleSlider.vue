<template>
  <input
    class="bg-gray-400 w-full outline-none"
    :style="{ '--size': size, '--r': color.r, '--g': color.g, '--b': color.b }"
    type="range"
    v-model="values"
    @input="setValues"
  />
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    bright: Number,
    color: Object,
    size: { type: String, default: "1.75em" },
  },

  setup(props, { emit }) {
    const values = ref(props.bright);
    const setValues = () => {
      emit("action", values);
    };

    watch(
      () => props.bright,
      value => {
        values.value = value;
      }
    );
    return { values, setValues };
  },
});
</script>

<style>
input[type="range"] {
  appearance: none;

  @apply bg-body;
  border-radius: 1em;
  overflow: hidden;
}
input[type="range"]::-webkit-slider-thumb {
  height: var(--size);
  width: var(--size);
  -webkit-appearance: none;
  appearance: none;
  box-shadow: calc(var(--size) * -13) 0 0 calc(var(--size) * 12.5)
    rgb(var(--r), var(--g), var(--b));
  border-radius: 50%;
  cursor: pointer;
  @apply bg-white;
}
</style>
