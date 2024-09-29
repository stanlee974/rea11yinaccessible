import { type Writable, writable } from "svelte/store";

function persist(key: string, value: string) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function writableSession(key: string, initialValue: string | object) {
  const data = typeof initialValue === "string" ? initialValue : JSON.stringify(initialValue)
  const item = sessionStorage.getItem(key);
  let store: Writable<string> | undefined = undefined
  if (item) {
    const sessionValue = JSON.parse(item);
    if (!sessionValue) {
      persist(key, data)
    }
    store = writable(sessionValue);
  }
  if (!store) {
    store = writable(data);
  }
  store.subscribe(value => persist(key, value));
  return store;
}

export function resetSession(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

