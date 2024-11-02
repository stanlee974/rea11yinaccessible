import {get} from "svelte/store";
import {persisted} from 'svelte-persisted-store'

type Disabilities = {
    blind: boolean,
    epilepsy: boolean
}

type animationModel = {
    disabilities: Disabilities,
    countdown: {
        startTimestamp: Date
        total: number
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
        startTimestamp: new Date(),
        total: 3599999
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

export const getAccessibilityModeStoreQueryParam = () => {
    return get(animationStore).disabilities.blind ? '?isA11yMode=true' : '';
}

export const updateDisabilities = (newDisabilitiesValue: Disabilities) => {
    animationStore.update((data) => ({
        ...data,
        disabilities: newDisabilitiesValue
    }))
}

