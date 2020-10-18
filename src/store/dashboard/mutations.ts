import { State, SwatchItem } from "./state";

const mutations = {
  addSwatchItem({swatch} : State, item) {
    swatch.push(item)
  },
  removeSwatchItem({swatch} : State, item :SwatchItem) {
    const index = swatch.findIndex(savedItem => item.color === savedItem.color)
    swatch = swatch.splice(index, 1)
  },
};

export default mutations;
