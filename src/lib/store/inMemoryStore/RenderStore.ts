import {writable} from "svelte/store";

export class RenderData {
    constructor(public title: string, public neon: string, public flux: string, public step: string) {
        this.neon = normalize(this.neon)
        this.flux = normalize(this.flux)
    }
}

export function normalize(data: string) {
    return data.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

export function renderStoreSetData(title: string, neon: string, flux: string) {
    renderStore.update((data) => ({...data, title: title, neon: normalize(neon), flux: normalize(flux)}))
}

export const renderStore = writable(new RenderData("", "", "", ""));
