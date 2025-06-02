import {t, locales, setLocale, locale} from "$lib/translations"
import {goto} from "$app/navigation";
import {base} from "$app/paths";
import {renderStore, renderStoreSetData} from "$lib/store/inMemoryStore/RenderStore";
import {get} from "svelte/store";
import {getAccessibilityModeStoreQueryParam} from "$lib/store/AnimationStore";

export {t, locales, setLocale, locale}

export const enum Step {
    FIRST_PLACE = "niortalis.firstPlace",
    SECOND_PLACE = "niortalis.secondPlace",
    THIRD_PLACE = "niortalis.thirdPlace",
    FOURTH_PLACE = "niortalis.fourthPlace",
    FIFTH_PLACE = "niortalis.fifthPlace",
    SIXTH_PLACE = "niortalis.sixthPlace",
    SEVENTH_PLACE = "niortalis.seventhPlace",
    EIGHTH_PLACE = "niortalis.eighthPlace",
    NINTH_PLACE = "niortalis.ninthPlace",
    WAITING_ROOM = "waitingRoom",
    ABRI_MEDICAL = "shelterMedicalRoom",
    ABRI_COMPUTER = "shelterComputerRoom",
    ABRI_SEARCHCENTER = "shelterSearchCenterRoom",
    SURFACE_ENTRANCE = "surfaceEntrance",
    SURFACE_LABORATORY = "surfaceLaboratory",
    SURFACE_LABORATORY_AUDIOVISUALROOM = "audiovisualRoom",
    SURFACE_LABORATORY_SANCTUARY = "sanctuary",
    OUTRO = "outro",
    SUMMARY = "summary",
}

export async function redirect(locale: string, path: string = "") {
    if (path.startsWith("/")) {
        await goto(`${base}${path}${getAccessibilityModeStoreQueryParam()}`)
    } else {
        await goto(`${base}/${locale}/${path}${getAccessibilityModeStoreQueryParam()}`)
    }
}

export async function changeLangRedirect(id: string, lang: string) {
    await setLocale(lang)
    let renderData = get(renderStore)
    renderStoreSetData(t.get(`common.step.${renderData.step}`), t.get(`${renderData.step}.neon.title`), t.get(`${renderData.step}.neon.subtitle`))
    await goto(base + normalizeUrl(id, lang))
}

export function normalizeUrl(id: string, lang: string) {
    return id?.replace("[lang]", lang).replace("(escape)/", "")
}
