import { get, type Writable } from "svelte/store";
import { writableSession } from "./technical/PersistentStore";

export let accessibilityModeStore: Writable<string> | undefined = undefined

export const getAccessibilityMode = () => {
  if (accessibilityModeStore) {
    return get(accessibilityModeStore) === "true"
  }
  return false
}

export const getAccessibilityModeStore = (): Writable<string> => {
  if (!accessibilityModeStore) {
    return initAccessibilityModeStore(false)
  }
  return accessibilityModeStore
}

export const setAccessibilityMode = (value: boolean) => {
  if (accessibilityModeStore) {
    return accessibilityModeStore.set(String(value))
  } else {
    return initAccessibilityModeStore(value);
  }
  return undefined
}

export const checkAccessibilityMode = () => {
  return accessibilityModeStore
}

const initAccessibilityModeStore = (init: boolean) => {
  return accessibilityModeStore = writableSession("accessibilityMode", String(init))
}

export const getAccessibilityModeStoreQueryParam = () => {
  return getAccessibilityMode() ? '?isA11yMode=true' : '';
}
