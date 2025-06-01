import {t, locales, setLocale, locale} from "$lib/translations"
import {goto} from "$app/navigation";
import {base} from "$app/paths";
import {renderStore, renderStoreSetData} from "$lib/store/inMemoryStore/RenderStore";
import {get} from "svelte/store";
import {getAccessibilityModeStoreQueryParam} from "$lib/store/AnimationStore";

export {t, locales, setLocale, locale}

export const enum Step {
    FIRST_PLACE = "eldoria.firstPlace",
    SECOND_PLACE = "eldoria.secondPlace",
    THIRD_PLACE = "eldoria.thirdPlace",
    FOURTH_PLACE = "eldoria.fourthPlace",
    FIFTH_PLACE = "eldoria.fifthPlace",
    SIXTH_PLACE = "eldoria.sixthPlace",
    SEVENTH_PLACE = "eldoria.seventhPlace",
    EIGHTH_PLACE = "eldoria.eighthPlace",
    NINTH_PLACE = "eldoria.ninthPlace",
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
