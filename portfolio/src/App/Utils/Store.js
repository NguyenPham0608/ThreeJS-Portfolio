import { createStore } from "zustand/vanilla";
import Physics from "../World/Physics";

export const sizesStore = createStore(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
}));

export const appStateStore = createStore(() => ({
  physicsReady: false,
}));
