<template>
  <div class="colorpicker">
    <div ref="picker"></div>
  </div>
</template>

<script>
/* eslint-disable vue/custom-event-name-casing */
import iro from "@jaames/iro";

export default {
  props: {
    value: {
      type: [Object, String],
    },
    size: {
      type: Number,
      default: 300,
    },
    ctRange: {
      type: Object,
      default: () => ({
        min: 1700,
        max: 6500,
      }),
    },
    type: String,
    colorType: String,
    sliderShape: Boolean,
    sliderDirection: { type: String, default: "horizontal" },

    css: {
      type: Object,
      default: () => {
        "";
      },
    },
  },
  data() {
    return {
      colorPicker: null,
      length: 300,
    };
  },
  methods: {
    onInput(color) {
      this.colorType === "kelvin"
        ? this.$emit("action", color[this.colorType])
        : this.$emit("action", color[this.colorType]);
    },
    onColorChange(color, changes) {
      this.$emit("color:change", {
        color,
        changes,
      });
    },
    onColorInit(color, changes) {
      this.$emit("color:init", {
        color,
        changes,
      });
    },
    onInputChange(color, changes) {
      this.$emit("input:change", {
        color,
        changes,
      });
    },
    onInputStart(color) {
      this.$emit("input:start", {
        color,
      });
    },
    onInputMove(color) {
      this.$emit("input:move", {
        color,
      });
    },
    onInputEnd(color) {
      this.$emit("input:end", {
        color,
      });
    },
    onMount(colorPicker) {
      this.$emit("mount", {
        colorPicker,
      });
    },
    handleResize() {
      const height = document.getElementsByClassName("colorpicker")[0]
        .parentNode.offsetHeight;

      const width = document.getElementsByClassName("colorpicker")[0].parentNode
        .offsetWidth;

      // console.log("w:", width, "h:", height);
      if (height < 400) {
        this.length = height / 1.25;
      } else {
        this.length = height / 1.5;
      }
    },
  },
  mounted() {
    this.handleResize();
    const sliderType = this.colorType === "kelvin" ? "kelvin" : "hue";
    const sliderShape = this.sliderShape ? "circle" : null;
    this.colorPicker = new iro.ColorPicker(this.$refs.picker, {
      width: this.length,
      handleSvg: this.handleSvg,
      color: this.value,
      padding: this.padding,
      layout: [
        {
          component: iro.ui[this.type],
          options: {
            sliderType: sliderType,
            sliderShape: sliderShape,
            layoutDirection: this.sliderDirection,
            minTemperature: 2000,
            maxTemperature: 6500,
          },
        },
      ],
      css: this.css,
    });
    this.colorPicker.on("input:end", this.onInput);
    this.colorPicker.on("color:change", this.onColorChange);
    this.colorPicker.on("color:init", this.onColorInit);
    this.colorPicker.on("input:change", this.onInputChange);
    this.colorPicker.on("input:start", this.onInputStart);
    this.colorPicker.on("input:move", this.onInputMove);
    this.colorPicker.on("input:end", this.onInputEnd);
    this.colorPicker.on("mount", this.onMount);
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    this.colorPicker.off("input:end", this.onInput);
    this.colorPicker.off("color:change", this.onColorChange);
    this.colorPicker.off("color:init", this.onColorInit);
    this.colorPicker.off("input:change", this.onInputChange);
    this.colorPicker.off("input:start", this.onInputStart);
    this.colorPicker.off("input:move", this.onInputMove);
    this.colorPicker.off("input:end", this.onInputEnd);
    this.colorPicker.off("mount", this.onMount);
  },
  watch: {
    value(newValue) {
      if (this.colorPicker.color) {
        this.colorPicker.color[this.colorType] = newValue;
      }
    },
    length(v) {
      this.colorPicker.resize(v);
    },
  },
};
</script>
