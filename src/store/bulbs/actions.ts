import { Lookup } from "node-yeelight-wifi";
import _ from "lodash";
import { onChange } from "@/services/bulb";

const actions = {
  async discovery({ state, dispatch }: any) {
    state.discovering = true;
    const look = new Lookup();
    look.on("detected", device => {
      state.devices.push(device);
      dispatch("setListeners", device);
    });
  },

  setListeners({ state }: any, device: any) {
    device.on("stateUpdate", device => {
      state.devices = onChange(state.devices, device);
    });
  },

  setPower: _.debounce(function({ state }, { bulbs, power }) {
    state.loading = true;
    bulbs.forEach(bulb => {
      bulb.setPower(power);
    });
    state.loading = false;
  }, 200),

  setBright: _.debounce(function({ state }, { bulbs, bright }) {
    state.loading = true;
    bulbs.forEach(bulb => {
      bulb.setBright(parseInt(bright), 300);
    });
    state.loading = false;
  }, 400),
};

export default actions;
