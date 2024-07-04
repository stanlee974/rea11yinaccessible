import { get, type Writable } from "svelte/store";
import { resetSession, writableSession } from "./technical/PersistentStore";


let stepStore: Writable<string> | undefined = undefined
export const checkStepStore = () => {
  return stepStore
}

export const getStepIndex = () => {
  if (stepStore) {
    return Number(get(stepStore))
  }
  return 0
}

export const setStepIndex = (index: number) => {
  if (stepStore) {
    stepStore.set(index.toString())
  }
  return undefined
}

export const initStepStore = (init: string) => {
  stepStore = writableSession("step", init)
}
