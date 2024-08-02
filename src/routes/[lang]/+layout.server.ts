import "carbon-components-svelte/css/g90.css";
import {setLocale} from "$lib";
import type {LayoutServerLoad} from "./$types";


export const load: LayoutServerLoad  = async ({ params }) => {
        // setLocale(params.lang)
    // return {lang: params.lang}
};

