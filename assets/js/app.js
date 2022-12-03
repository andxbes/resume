// you can import modules from the theme lib or even from
// NPM packages if they support it…
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
Alpine.plugin(intersect); //lazy-loading, infinity loading

/** alpine-components **/
// import app from "./components/alpine/app";


if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const _load = Promise.resolve( Alpine.start());
        _load.then(() => {
            // console.info(started alpine);
        });
    })

    document.addEventListener('alpine:init', () => {
        window.Alpine = Alpine;
        // window.app = app;
       
    });
}
