import { createStore } from "vuex";
import bulbs from "./bulbs";
import dashboard from "./dashboard";

export default createStore({
  modules: {
    bulbs,
    dashboard,
  },
});
