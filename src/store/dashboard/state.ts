export type SwatchItem = {
  type: string,
  color:{r: number, g: number, b: number}
}
export type State =  {
  devices: Record<string, any>;
  rooms: Record<string, any>,
  swatch: Array<SwatchItem> }
export interface DashboardState {
  rootState: any;
  state: State;
}
const state = {
  devices: [],
  rooms: [],
  swatch: []
};

export default state;
