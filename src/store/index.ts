import { createStore } from "vuex";
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import bulbs from "./bulbs";
import dashboard from "./dashboard";


const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  modules: {
    bulbs,
    dashboard,
  },
   plugins: [vuexLocal.plugin]
});
