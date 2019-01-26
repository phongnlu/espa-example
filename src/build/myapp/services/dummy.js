import {apiGetAsPromise} from './apiClient.js';

export function getDummyJsonAsPromise() {
    return apiGetAsPromise({
        url: 'src/build/myapp/mock/dummy.json',
        cache: true,
    });
}
