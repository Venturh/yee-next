<template>
  <div
    @click="toogleFavorite"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="flex items-center justify-center p-1 duration-500 ease-in-out border border-current rounded-lg cursor-pointer text-primary transition-width"
    :class="favorite ? 'w-1/4' : 'w-2/3'"
  >
    <Icon
      class=" text-primary"
      :icon="
        hover
          ? !favorite
            ? 'heart-fill'
            : 'heart-stroke'
          : favorite
          ? 'heart-fill'
          : 'heart-stroke'
      "
      :size="4"
    />

    <span v-if="!favorite" class="ml-1 text-sm">Favorite</span>
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
    const favorite = ref(props.isFavorite);
    const hover = ref(false);
    const toogleFavorite = () => {
      favorite.value = !favorite.value;
      emit("action");
    };
    return { favorite, toogleFavorite, hover };
  },
};
</script>
