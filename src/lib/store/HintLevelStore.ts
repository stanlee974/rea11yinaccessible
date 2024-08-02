import { get, type Writable } from "svelte/store";
import { resetSession, writableSession } from "./technical/PersistentStore";


export let hintLevelStore: Writable<string>
export const checkHintLevelStore = () => {
  return hintLevelStore
}

export const getHintLevel = () => {
  if (hintLevelStore) {
    return get(hintLevelStore)
  }
  return "0"
}

export const increaseHintLevel = () => {
  if (hintLevelStore) {
    hintLevelStore.update(value => String(Number(value) + 1))
  }
  return undefined
}

export const initHintLevelStore = (init: string) => {
  hintLevelStore = writableSession("hintLevel", init)
}

export const resetLevelStore = () => {
  resetSession("hintLevel", "0")
  hintLevelStore.set('0')
  //initHintLevelStore("0")
}
