import {t, locales, setLocale, locale, getTranslationProps} from "$lib/translations"
import {goto, invalidateAll} from "$app/navigation";
import {base} from "$app/paths";
import {RenderData, renderStore, renderStoreSetData} from "$lib/store/inMemoryStore/RenderStore";
import { get } from "svelte/store";

export {t, locales, setLocale, locale}

export const enum Step {
    WAITING_ROOM = "waitingRoom",
    ABRI_ENTRANCE = "shelterEntrance",
    ABRI_MEDICAL = "shelterMedicalRoom",
    ABRI_COMPUTER = "shelterComputerRoom",
    ABRI_SEARCHCENTER = "shelterSearchCenterRoom",
    SURFACE_ENTRANCE = "surfaceEntrance",
    SURFACE_LABORATORY = "surfaceLaboratoryEntrance",
    SURFACE_LABORATORY_AUDIOVISUALROOM = "audiovisualRoom",
    SURFACE_LABORATORY_SANCTUARY = "sanctuary",
    FINAL = "final",
}

export async function redirect(locale: string, path: string = "") {
    await goto(base + "/" + locale + "/" + path)
}

export async function changeLangRedirect(id: string | null, lang: string) {
    await setLocale(lang)
    let renderData = get(renderStore)
    renderStoreSetData(t.get(`common.step.${renderData.step}`), t.get(`${renderData.step}.neon.title`), t.get(`${renderData.step}.neon.subtitle`))
    await goto(base + id?.replace("[lang]", lang).replace("(escape)/", ""))
}