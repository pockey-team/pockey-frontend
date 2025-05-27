import { v4 as uuidv4 } from "uuid";

const DEVICE_ID_KEY = "deviceId";

export const getDeviceId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const deviceId = localStorage.getItem(DEVICE_ID_KEY);
  return deviceId;
};

export const setDeviceId = () => {
  if (typeof window === "undefined") {
    return;
  }

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
};

export const deleteDeviceId = () => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(DEVICE_ID_KEY);
};
