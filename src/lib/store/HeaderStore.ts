import {persisted} from 'svelte-persisted-store'

export const headerStore = persisted('header', {
    songVolume: 2,
    soundVolume: 5,
    playSong: false,
    appTourIsDone: false
}, {
    storage: 'session', syncTabs: false
})

export const setPlaySong = (value: boolean) => {
    if (headerStore) {
        headerStore.update((data) => ({...data, playSong: value}))
    }
}

export const updateSongVolume = (value: number) => {
    if (headerStore) {
        headerStore.update((data) => ({...data, songVolume: value}))
    }
}

export const updateSoundVolume = (value: number) => {
    if (headerStore) {
        headerStore.update((data) => ({...data, soundVolume: value}))
    }
}

export const closeAppTour = () => {
    if (headerStore) {
        headerStore.update((data) => ({...data, appTourIsDone: true}))
    }
}
