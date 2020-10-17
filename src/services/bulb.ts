export const onChange = (devices: any, newDevice: any) => {
  const index = devices.findIndex(e => e.host == newDevice.host);
  //bug in api, sometimes get f.eg: 12.5 instead of 125
  if (newDevice.rgb.r % 1 != 0) {
    newDevice.rgb = {
      r: newDevice.rgb.r * 10 * 2,
      g: newDevice.rgb.g * 10 * 2,
      b: newDevice.rgb.b * 10 * 2,
    };
  }
  const newState = [...devices];
  newState[index] = newDevice;
  return newState;
};

export const setFavoriteStorage = (device: any, type: string) => {
   device = device.value
  const json = localStorage.getItem(type) || "[]";
  const storage: any = JSON.parse(json);
  if (storage.length === 0) {
    storage.push(device);
    localStorage.setItem(type, JSON.stringify(storage));
    return storage;
  }
  const index = storage.findIndex(savedDevice => savedDevice.id === device.id);
  if (index === -1) {
    storage.push(device);
  } else {
    storage.splice(index, 1);
  }
  localStorage.setItem(type, JSON.stringify(storage));
  return storage;
};
