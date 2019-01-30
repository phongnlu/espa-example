import {getSpaHost, getCurrentContext} from '../utils.js';
import {apiGetAsPromise} from './apiClient.js';

let locale = {};
let lang = 'en';

const tmpl = ESPA.tmpl;
ESPA.tmpl = function(str, data) {
    if (typeof data !== 'undefined') {
        data = Object.assign(data, {locale: locale});
    } else {
        data = {};
    }
    return tmpl(str, data);
};

export function loadLocaleAsPromise() {
    return apiGetAsPromise({
        // add logic for loading based on env
        url: `${getSpaHost()}src/build/${getCurrentContext()}/locale/${lang}.json`,
        cache: true,
    });
}

export function setLocale(data) {
    const html = document.head.parentNode;
    html.setAttribute('dir', data.dir);
    html.setAttribute('lang', data.lang);
    locale = data;
}

export function setLang(data) {
    lang = data;
}
