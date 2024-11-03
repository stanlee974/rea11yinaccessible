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
        startTimestampReborn: number | undefined
        total: number
        started: boolean
    },
    mask: null | number,
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
    },
    mask: null
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
            startTimestampReborn: undefined,
            started: true
        }
    }))
}

export const initExtraCountdown = () => {
    animationStore.update((data) => ({
        ...data, countdown: {
            total: 1800000,
            startTimestamp: data.countdown.startTimestamp,
            startTimestampReborn: new Date().getTime(),
            started: true
        },
        mask: 70
    }))
}

export const getCountdown = () => {
    const countdown = get(animationStore).countdown
    return (countdown.startTimestampReborn ?? countdown.startTimestamp ?? 0) + countdown.total
}

export const getElapsedTime = () => {
    const countdown = get(animationStore).countdown
    const diff = new Date().getTime() - (countdown.startTimestampReborn ?? countdown.startTimestamp ?? 0)
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h:${minutes}m:${seconds}s`
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

