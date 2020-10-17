<template>
  <div
    @click="toogleFavorite"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="flex items-center justify-center p-1 duration-500 ease-in-out border border-current rounded-lg cursor-pointer text-primary transition-width"
    :class="isFavorite ? 'w-1/4' : 'w-2/3'"
  >
    <Icon
      class=" text-primary"
      :icon="
        hover
          ? !isFavorite
            ? 'heart-fill'
            : 'heart-stroke'
          : isFavorite
          ? 'heart-fill'
          : 'heart-stroke'
      "
      :size="4"
    />

    <span v-if="!isFavorite" class="ml-1 text-sm">Favorite</span>
  </div>
</template>

<script>
import { ref } from "vue";
import Icon from "./Icon.vue";
export default {
  components: {
    Icon,
  },
  props: { isFavorite: Boolean },
  setup(props, { emit }) {
    const hover = ref(false);
    const toogleFavorite = () => {
      emit("action");
    };
    return { toogleFavorite, hover };
  },
};
</script>
