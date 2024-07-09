import { writable } from "svelte/store";
import { Step } from "$lib";

export class RenderData {
  constructor(public title: Step, public neon: string, public flux: string) {}
}
export const renderStore = writable(new RenderData(Step.INTRODUCTION,"", ""));
