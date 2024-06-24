import { get, type Writable } from "svelte/store";
import { writableSession } from "./PersistentStore";


let soundVolumeStore: Writable<string> | undefined = undefined
export const checkVolume = () => {
  return soundVolumeStore
}

export const getVolume = () => {
  if (soundVolumeStore) {
    return Number(get(soundVolumeStore)) / 100
  }
  return 0
}

export const setVolume = (value: number) => {
  if (soundVolumeStore) {
    return soundVolumeStore.set(String(value))
  }
  return undefined
}

export const initVolumeStore = (init: string) => {
  soundVolumeStore = writableSession("soundvolume", init)
}
