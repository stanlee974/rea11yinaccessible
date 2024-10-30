import {get} from "svelte/store";
import {persisted} from 'svelte-persisted-store'

type Disabilities = {
    blind: boolean,
    epilepsy: boolean
}

type animationModel = {
    disabilities: Disabilities,
    countdown: {
        startTimestamp: number | undefined
        total: number
        started: boolean
    }
}

export enum DISABILITY_NAME {
    BLIND = "blind",
    EPILEPSY = "epilepsy"
}

export const animationStore = persisted('animation', {
    disabilities: {
        blind: false,
        epilepsy: false
    },
    countdown: {
        startTimestamp: undefined,
        total: 0,
        started: false
    }
} as animationModel, {
    storage: 'session', syncTabs: false
})

export const updateBlind = (newBlindValue: boolean) => {
    animationStore.update((data) => ({
        ...data,
        disabilities: {
            ...data.disabilities,
            blind: newBlindValue
        }
    }))
}

export const updateEpilepsy = (newEpilepsyValue: boolean) => {
    animationStore.update((data) => ({
        ...data,
        disabilities: {
            ...data.disabilities,
            epilepsy: newEpilepsyValue
        }
    }))
}

export const initCountdown = () => {
    animationStore.update((data) => ({
        ...data, countdown: {
            total: 3599999,
            startTimestamp: new Date().getTime(),
            started: true
        }
    }))
}

export const initExtraCountdown = () => {
    animationStore.update((data) => ({
        ...data, countdown: {
            total: 1800000,
            startTimestamp: new Date().getTime(),
            started: true
        }
    }))
}

export const getCountdown = () => {
    const countdown = get(animationStore).countdown
    return (countdown.startTimestamp ?? 0) + countdown.total
}

export const getAccessibilityModeStoreQueryParam = () => {
    return get(animationStore).disabilities.blind ? '?isA11yMode=true' : '';
}

export const updateDisabilities = (newDisabilitiesValue: Disabilities) => {
    animationStore.update((data) => ({
        ...data,
        disabilities: newDisabilitiesValue
    }))
}

