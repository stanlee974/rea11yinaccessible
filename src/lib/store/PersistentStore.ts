import { type Writable, writable } from "svelte/store";

function persist(key: string, value: string) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function writableSession(key: string, initialValue: string) {
  const item = sessionStorage.getItem(key);
  let store: Writable<string> | undefined = undefined
  if (item) {
    const sessionValue = JSON.parse(item);
    if (!sessionValue) {
      persist(key, initialValue)
    }
    store = writable(sessionValue);
  }
  if (!store) {
    store = writable(initialValue);
  }
  store.subscribe(value => persist(key, value));
  return store;
}

export function resetSession(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

