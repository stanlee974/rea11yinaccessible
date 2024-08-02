import {get, writable, type Writable} from "svelte/store";
import { writableSession } from "./technical/PersistentStore";
import { getAccessibilityMode } from "$lib/store/AccessibilityModeStore";
import {setLocale} from "$lib";

//FIXME à mutualiser les store persistent si possible
export class HeaderStoreData {
  constructor(public accessibilityMode: boolean = false, public songVolume: number = 0, public soundVolume: number = 0, public playSong: boolean = true) {
  }
}

export let headerStore: Writable<HeaderStoreData> | undefined = undefined

export const getHeaderStoreData = () => {
  if (headerStore) {
    return get(headerStore)
  }
  initHeaderStore(new HeaderStoreData())
}

// export const toggleAccessibilityMode = () => {
//   let accessibilityMode = getAccessibilityMode();
//   if (accessibilityMode) {
//     return headerStore.update((data) => ({...data, accessibilityMode: !data.accessibilityMode}))
//   }
//   return undefined
// }
export const setPlaySong = (value: boolean) => {
  if (headerStore) {
    return headerStore.update((data) => ({...data, playSong: value}))
  }
  return undefined
}

export const initHeaderStore = (init: HeaderStoreData) => {
  const session = writableSession("header", JSON.stringify(init))
  let value = JSON.parse(get(session));
  headerStore = writable(value)
}
