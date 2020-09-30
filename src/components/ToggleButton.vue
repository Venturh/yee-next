<template>
  <div
    class=" w-12 h-6 flex items-center  rounded-full bg-body"
    @click="setActive"
  >
    <span
      class=" w-6 h-6 bg-primary rounded-full transform"
      :class="[active ? 'translate-x-6' : '']"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: { power: Boolean },
  setup(props, { emit }) {
    const active = ref(props.power);
    const setActive = () => {
      active.value = !active.value;
      emit("action", active);
    };
    watch(
      () => props.power,
      value => {
        active.value = value;
      }
    );

    return { active, setActive };
  },
});
</script>
