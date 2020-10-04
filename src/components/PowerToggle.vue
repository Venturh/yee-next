<template>
  <div
    class="flex items-center w-12 h-6 rounded-full"
    :class="`bg-${bg}`"
    @click="setActive"
  >
    <span
      class="w-6 h-6 transform rounded-full bg-primary"
      :class="[active ? 'translate-x-6' : '']"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: { device: Object, bg: { type: String, default: "body" } },
  setup(props) {
    const store = useStore();
    const active = ref(props.device[0].power);

    const setActive = () => {
      active.value = !active.value;
      store.dispatch("bulbs/setPower", {
        bulbs: props.device,
        power: active.value,
      });
    };
    watch(
      () => props.device[0].power,
      value => {
        active.value = value;
      }
    );

    return { active, setActive };
  },
});
</script>
