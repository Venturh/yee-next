<template>
  <div class="relative flex flex-col space-x-4">
    <div
      class="flex items-center space-x-1 text-white"
      :class="active ? 'text-primary ' : 'text-white'"
    >
      <Icon class="ml-4 mr-1" :icon="icon" :size="iconSize" />
      <p class="text-lg" v-if="showText">
        {{ text }}
      </p>
      <div class="flex space-x-2">
        <Icon
          v-if="!toggle || !active"
          icon="arrow-down-s"
          @click="setToggle"
          class="inline-block w-6 h-6 fill-current"
        />
        <Icon
          v-if="toggle && active"
          icon="arrow-up-s"
          @click="setToggle"
          class="inline-block w-6 h-6 fill-current"
        />
      </div>
    </div>
    <div v-if="toggle" class="ml-">
      <slot />
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
import { ref } from "vue";
export default {
  components: {
    Icon,
  },
  props: {
    icon: String,
    iconSize: Number,
    text: String,
    showText: Boolean,
    active: Boolean,
  },
  setup(props) {
    const toggle = ref(props.active);
    const setToggle = () => {
      toggle.value = !toggle.value;
    };
    return { toggle, setToggle };
  },
};
</script>

<style></style>
