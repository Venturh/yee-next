import { DashboardState } from "./state";

const actions = {
  getDevices({ state, rootState }: DashboardState) {
    const {
      bulbs: { devices },
    } = rootState;

    const json = localStorage.getItem("favDevices") || "[]";

    const storage: any = JSON.parse(json);

    const filtered: any = [];

    devices.filter(function(newData) {
      return storage.filter(function(oldData) {
        if (newData.id === oldData.id) {
          filtered.push(newData);
          console.log("filtered -> filtered", filtered);
        }
      });
    });

    state.devices = filtered;
  },
  setDevices({ state }: DashboardState, devices: any) {
    console.log("setDevices -> devices", devices);
    state.devices = devices;
  },
};

export default actions;
