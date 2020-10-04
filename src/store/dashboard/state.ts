export interface DashboardState {
  rootState: any;
  state: { devices: Record<string, any>; rooms: Record<string, any> };
}
const state = {
  devices: [],
  rooms: [],
};

export default state;
