import { Lookup } from "node-yeelight-wifi";
import _ from "lodash";
import { onChange } from "@/services/bulb";

const actions = {
  async discovery({ state, dispatch }: any) {
    state.discovering = true;
    state.loading = true;
    const look = new Lookup();
    look.on("detected", device => {
      state.loading = true;
      state.devices.push(device);
      dispatch("setListeners", device);
      state.loading = false;
    });
  },

  setListeners({ state, dispatch }: any, device: any) {
    dispatch("dashboard/getDevices", null, { root: true });
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
    bulbs.forEach(bulb => {
      bulb.setBright(parseInt(bright), 300);
    });
  }, 400),

  setRgb: _.debounce(function({ state }, { bulbs, rgb }) {
    bulbs.forEach(bulb => {
      bulb.setRGB(rgb);
    });
  }, 200),

    setCt: _.debounce(function({ state }, { bulbs, ct }) {
    bulbs.forEach(bulb => {
      bulb.setCT(ct, 300);
    });
  }, 200),
};

export default actions;
