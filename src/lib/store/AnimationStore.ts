import {get} from "svelte/store";
import {persisted} from 'svelte-persisted-store'

type animationModel = {
    disabilities: DISABILITY_NAME[],
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
    disabilities: [],
    countdown: {
        startTimestamp: new Date(),
        total: 3599999
    }
} as animationModel, {
    storage: 'session', syncTabs: false
})

export const updateBlind = (checked: boolean) => {
    updateDisabilities(DISABILITY_NAME.BLIND, checked)
}

export const updateEpilepsy = (checked: boolean) => {
    updateDisabilities(DISABILITY_NAME.EPILEPSY, checked)
}

export const getAccessibilityModeStoreQueryParam = () => {
    return get(animationStore).disabilities.includes(DISABILITY_NAME.BLIND) ? '?isA11yMode=true' : '';
}

const updateDisabilities = (id: DISABILITY_NAME, checked: boolean) => {
    if (animationStore) {
        let animationData = get(animationStore).disabilities
        if (checked) {
            if (!animationData.includes(id)) {
                animationData.push(id)
            }
        } else {
            animationData = animationData.filter((element) => element !== id)
        }
        animationStore.update((data) => ({...data, disabilities: animationData}))
    }
}

