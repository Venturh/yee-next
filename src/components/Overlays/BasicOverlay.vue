<template>
  <div class="z-10 flex flex-col w-1/5 p-4 space-y-4 h-11/12 bg-accent">
    <h1>New {{ category }}</h1>
    <div v-if="hasInput">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="name">
        {{ category }}name
      </label>
      <input
        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
      />
    </div>
    <div class="self-center">
      <slot />
    </div>
    <div class="flex flex-col space-y-2">
      <button
        class="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="button"
        @click="$emit('swatch')"
      >
        Add {{ category }}
      </button>
      <button
        class="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="button"
        @click="$emit('back')"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    category: {
      type: String,
      default: "Color",
    },
    hasInput: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
