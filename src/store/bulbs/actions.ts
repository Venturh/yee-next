import { Lookup } from "node-yeelight-wifi";
import _ from "lodash";
import { onChange } from "@/services/bulb";

const actions = {
  async discovery({ state, dispatch }: any) {
    state.discovering = true;
    state.loading = true;
    const look = new Lookup();
    look.on("detected", device => {
      state.devices.push(device);
      dispatch("setListeners", device);
    });
  },

  setListeners({ state, dispatch }: any, device: any) {
    dispatch("dashboard/getDevices", null, { root: true });
    state.loading = false;
    device.on("stateUpdate", device => {
      state.devices = onChange(state.devices, device);
    });
  },

  setPower: _.debounce(function({ state }, { bulbs, power }) {
    bulbs.forEach(bulb => {
      bulb.setPower(power);
    });
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
