import { get, type Writable } from "svelte/store";
import { writableSession } from "./PersistentStore";


let stepStore: Writable<string> | undefined = undefined
export const checkStepStore = () => {
  return stepStore
}

export const getStep = () => {
  if (stepStore) {
    return Number(get(stepStore)) / 100
  }
  return 0
}

export const setStep = (value: number) => {
  if (stepStore) {
    return stepStore.set(String(value))
  }
  return undefined
}

export const initStepStore = (init: string) => {
  stepStore = writableSession("step", init)
}
