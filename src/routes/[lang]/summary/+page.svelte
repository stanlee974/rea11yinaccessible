<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Content, ExpandableTile, Tile,} from "carbon-components-svelte";
    import {t} from "$lib";
    import {RenderData, renderStore} from "../../../lib/store/inMemoryStore/RenderStore";
    import {Step} from "../../../lib";
    import {page} from "$app/stores";
    import {setLocale} from "../../../lib/translations";
    import {onMount} from "svelte";

    onMount(() => {
        renderStore.set(new RenderData($t(`common.step.${Step.SUMMARY}`), "", "", Step.SUMMARY));
        setLocale($page.params.lang)
        document.body.lang = $page.params.lang ?? "fr"
        document.title = $t('common.step.summary') + " | really inaccessible"
    })

    function getUsageUrl(lang: string) {
        const url = "https://www.w3.org/WAI/people-use-web/"
        switch (lang) {
            case "en":
                return url
            case "fr":
                return url + "fr"
            case "es":
                return url + "es"
            default:
                return url
        }
    }
</script>

<style lang="css">
    h3 {
        margin-left: 2rem;
        font-size: 1.6rem;
    }

    .tab {
        margin-left: 4rem;
        font-size: 1.3rem;
    }

    .italic {
        font-style: italic;
    }
</style>
<Content class="container">
    <h1 class="mt-5 mb-3">{$t('outro.conclusion.title')}</h1>
    <p class="mb-5">{$t("outro.conclusion.row.1")}</p>
    <Tile class="mb-3">
        <p>{$t("outro.conclusion.row.2_1")} <a href={getUsageUrl($page.params.lang)}
                                               target="_blank">{$t("outro.conclusion.row.2_2")}</a> {$t("outro.conclusion.row.2_3")}
        </p>
    </Tile>
    <div>
        <p class="mb-3">{$t("outro.conclusion.row.3")}</p>
        <ExpandableTile tileExpandedLabel={$t('outro.conclusion.viewLess')}
                        tileCollapsedLabel={$t('outro.conclusion.viewMore')} class="pb-5">
            <div slot="above">
                <h2>{$t('outro.conclusion.visual.title')}</h2>
            </div>
            <div slot="below">
                <h3>{$t('outro.conclusion.visual.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u> {$t('outro.conclusion.visual.1.disabilities.1.problem')}
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u> {$t('outro.conclusion.visual.1.disabilities.1.advice')}
                </p>
                <br aria-hidden="true"/>
                <h3>{$t('outro.conclusion.visual.2.title')} {$t('outro.conclusion.visual.2.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u>
                    <b>{$t('outro.conclusion.visual.2.disabilities.1.problem')}</b>
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u> {$t('outro.conclusion.visual.2.disabilities.1.advice')}
                </p>
                <br aria-hidden="true"/>
                <h3>{$t('outro.conclusion.visual.3.title')} {$t('outro.conclusion.visual.3.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u>
                    <b>{$t('outro.conclusion.visual.3.disabilities.1.problem')}</b>
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u>
                    {$t('outro.conclusion.visual.3.disabilities.1.cta.1.above')}
                    <a href={$t('outro.conclusion.visual.3.disabilities.1.cta.1.link')} target="_blank"
                       on:click|stopPropagation={() => console.debug("go to link")}
                    >
                        {$t('outro.conclusion.visual.3.disabilities.1.cta.1.label')}
                    </a>
                    .
                </p>
                <p class="tab">{$t('outro.conclusion.visual.3.disabilities.1.advice')}</p>
                <br aria-hidden="true"/>
                <h3>{$t('outro.conclusion.visual.4.title')} {$t('outro.conclusion.visual.4.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u>
                    <b>{$t('outro.conclusion.visual.4.disabilities.1.problem')}</b>
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u> {$t('outro.conclusion.visual.4.disabilities.1.advice')}
                </p>
            </div>
        </ExpandableTile>
        <br aria-hidden="true"/>
        <ExpandableTile tileExpandedLabel={$t('outro.conclusion.viewLess')}
                        tileCollapsedLabel={$t('outro.conclusion.viewMore')} class="pb-5">
            <div slot="above">
                <h2>{$t('outro.conclusion.cognitive.title')}</h2>
            </div>
            <div slot="below">
                <h3>{$t('outro.conclusion.cognitive.1.title')} {$t('outro.conclusion.cognitive.1.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u> {$t('outro.conclusion.cognitive.1.disabilities.1.problem')}
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u> {$t('outro.conclusion.cognitive.1.disabilities.1.advice')}
                </p>
                <br aria-hidden="true"/>
                <h3>{$t('outro.conclusion.cognitive.2.title')} {$t('outro.conclusion.cognitive.2.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u>
                    <b>{$t('outro.conclusion.cognitive.2.disabilities.1.problem')}</b>
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u> {$t('outro.conclusion.cognitive.2.disabilities.1.advice')}
                </p>
            </div>
        </ExpandableTile>
        <br aria-hidden="true"/>
        <ExpandableTile tileExpandedLabel={$t('outro.conclusion.viewLess')}
                        tileCollapsedLabel={$t('outro.conclusion.viewMore')} class="pb-5">
            <div slot="above">
                <h2>{$t('outro.conclusion.motor.title')}</h2>
            </div>
            <div slot="below">
                <h3>{$t('outro.conclusion.motor.1.title')} {$t('outro.conclusion.motor.1.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u> {$t('outro.conclusion.motor.1.disabilities.1.problem')}
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u>
                    {$t('outro.conclusion.motor.1.disabilities.1.cta.1.above')}
                    <a href={$t('outro.conclusion.motor.1.disabilities.1.cta.1.link')} target="_blank"
                       on:click|stopPropagation={() => console.debug("go to link")}
                    >
                        {$t('outro.conclusion.motor.1.disabilities.1.cta.1.label')}
                    </a>
                    .
                </p>
                <p class="tab">{$t('outro.conclusion.motor.2.disabilities.1.advice')}</p>
                <br aria-hidden="true"/>
                <h3>{$t('outro.conclusion.motor.2.title')} {$t('outro.conclusion.motor.2.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u> {$t('outro.conclusion.motor.2.disabilities.1.problem')}
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u> {$t('outro.conclusion.motor.1.disabilities.1.advice')}
                </p>
            </div>
        </ExpandableTile>
        <br aria-hidden="true"/>
        <ExpandableTile tileExpandedLabel={$t('outro.conclusion.viewLess')}
                        tileCollapsedLabel={$t('outro.conclusion.viewMore')} class="pb-5">
            <div slot="above">
                <h2>{$t('outro.conclusion.hearing.title')}</h2>
            </div>
            <div slot="below">
                <h3>{$t('outro.conclusion.hearing.1.title')} {$t('outro.conclusion.hearing.1.disabilities.1.title')}</h3>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.problem')}</u> {$t('outro.conclusion.hearing.1.disabilities.1.problem')}
                </p>
                <p class="tab"><u
                        class="italic">{$t('outro.conclusion.advice')}</u> {$t('outro.conclusion.hearing.1.disabilities.1.advice')}
                </p>
            </div>
        </ExpandableTile>
    </div>
</Content>