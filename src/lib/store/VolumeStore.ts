import { get, type Writable } from "svelte/store";
import { writableSession } from "./technical/PersistentStore";


let volumeStore: Writable<string> | undefined = undefined
export const checkVolume = () => {
  return volumeStore
}

export const getVolume = () => {
  if (volumeStore) {
    return Number(get(volumeStore)) / 100
  }
  return 0
}

export const getVolumeStore = () => {
  return volumeStore
}

export const setVolume = (value: number) => {
  if (volumeStore) {
    return volumeStore.set(String(value))
  }
  return undefined
}

export const initVolumeStore = (init: string) => {
  volumeStore = writableSession("volume", init)
}
