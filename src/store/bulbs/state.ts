export interface BulbState {
  loading: boolean;
  discovering: boolean;
  devices: any;
  rooms: any;
}
const state = {
  loading: false,
  discovering: false,
  loadingName: false,
  devices: [],
  rooms: [],
};

export default state;
