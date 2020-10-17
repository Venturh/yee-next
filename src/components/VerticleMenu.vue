<template>
  <div>
    <div class="" ref="linksRef">
      <router-link
        v-for="(item, index) in menuItems"
        :to="item.route"
        :key="item.text"
        @click="setSelected(index)"
        class="relative bottom-0 flex items-center w-full p-2 my-4 rounded-lg cursor-pointer "
        :class="[
          selected === index ? 'text-primary ' : 'text-white',
          expanded ? '' : 'justify-center',
        ]"
      >
        <div v-if="!item.dropdown" class="flex space-x-1 ">
          <Icon class="ml-4 mr-1" :icon="item.icon" :size="6" />
          <p class="text-lg" v-if="expanded">{{ item.text }}</p>
        </div>
        <dropdown
          v-else
          :icon="item.icon"
          :iconSize="6"
          :text="item.text"
          :showText="expanded"
          :active="selected === index"
        >
          <slot
            name="dropdown"
            :menuItems="item.dropdownItems"
            v-if="selected === index && item.dropdown && item.dropdownItems"
          />
        </dropdown>
      </router-link>
    </div>
    <span
      class="absolute w-2 transition-all duration-300 ease-in rounded-xl bg-primary"
      :style="style"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Icon from "./Icon.vue";
import Dropdown from "./Dropdown.vue";
export default defineComponent({
  components: {
    Icon,
    Dropdown,
  },
  props: {
    defaultSelected: { type: Number, default: 0 },
    menuItems: { type: Array, default: () => [] },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const selected = ref(props.defaultSelected);
    const linksRef = ref<HTMLDivElement>();
    const style = ref({ height: "0", top: "0" });

    const setStyles = () => {
      setTimeout(() => {
        if (selected.value === -1) return;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const node = linksRef.value?.children[
          selected.value
        ]! as HTMLDivElement;
        style.value = {
          height: node.offsetHeight / 2 + "px",
          top: node.offsetTop + node.offsetHeight / 4 + "px",
        };
      }, 100);
    };

    const setSelected = (select: number) => {
      selected.value = select;
      setStyles();
    };

    watch(selected, () => {
      setStyles();
    });

    onMounted(() => {
      setStyles();
    });

    return { selected, linksRef, style, setSelected, setStyles };
  },
});
</script>

<style></style>
