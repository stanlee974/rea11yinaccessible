<Header>
    <title>{"really inaccessible | " + title}</title>
    <div style:width="100%" style:max-width="250px" style:margin-right="1rem">
        <a href="{base}/">
            <ImageLoader
                    src="{base}/logo.png" alt="logo of really inaccessible" fadeIn={true}
            />
        </a>
    </div>
    <HeaderNav>
        <HeaderNavItem href="https://www.deque.com/axe/" text="Axe-core - test accessibilité"/>
        <HeaderNavMenu text="Réferentiel">
            <HeaderNavItem href="https://www.w3.org/WAI/WCAG22/Understanding/" text="WCAG"/>
            <HeaderNavItem href="https://accessibilite.numerique.gouv.fr/W3C" text="RGAA"/>
        </HeaderNavMenu>
        <HeaderNavMenu text="UUV - test E2E accessibilité">
            <HeaderNavItem href="https://github.com/Orange-OpenSource/uuv" text="Github"/>
            <HeaderNavItem href="https://orange-opensource.github.io/uuv/" text="Documentation"/>
            <HeaderNavItem href="https://github.com/e2e-test-quest/kata-e2e-uuv" text="Kata (exercism)"/>
        </HeaderNavMenu>
        <HeaderNavItem href="https://github.com/stanlee974/rea11yinaccessible" text="Source Code"/>
    </HeaderNav>
    <!--    <span style="font-size: 3rem; color: goldenrod">{$time}</span>-->
</Header>
<Tile style="position: sticky; top: 3rem">
    <Slider
            labelText="Song Volume"
            min={0}
            max={100}
            hideTextInput
            maxLabel="100"
            value={volume}
            step={1}
            on:change={(value) => {volumeStore.set(value.detail)}}
    />
</Tile>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
    ImageLoader,
    Slider,
    Tile,
  } from "carbon-components-svelte";
  import { base } from '$app/paths';
  import { writable } from "svelte/store";
  import { volumeStore } from "$lib/Store";

  export let title = ""
  export let volume = 10

  // let animationRef: any;
  // let latestStartTime: any;
  //
  // const COUNTDOWN_FROM = 3600000;
  //
  // let storedTime: string | null;
  // let remainingTime: number | null;
  //
  // const formatter = new Intl.DateTimeFormat("en", {
  //   hour12: false,
  //   minute: "2-digit",
  //   second: "2-digit"
  // });
  // export const time = writable(formatter.format(COUNTDOWN_FROM));
  //
  // onMount(() => {
  //   storedTime = localStorage.getItem("time");
  //   if (storedTime && storedTime !== "0") {
  //     remainingTime = Number(storedTime) ?? COUNTDOWN_FROM;
  //   } else {
  //     remainingTime = COUNTDOWN_FROM;
  //   }
  //   time.subscribe((value: string) => {
  //     localStorage.setItem("time", value);
  //   });
  // })
  // const animate = (timestamp: any) => {
  //   if (!latestStartTime) {
  //     latestStartTime = timestamp + remainingTime;
  //   }
  //
  //   const currentTime = latestStartTime - timestamp;
  //   if (currentTime <= 0) {
  //     cancelAnimationFrame(animationRef);
  //     time.set(formatter.format(0));
  //     return;
  //   }
  //   if (currentTime) {
  //     time.set(formatter.format(currentTime));
  //   }
  //
  //   animationRef = requestAnimationFrame(animate);
  // };
  //
  // onMount(() => animationRef = requestAnimationFrame(animate));

</script>

