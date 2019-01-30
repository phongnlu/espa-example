import {getSpaHost} from '../utils.js';
import {apiGetAsPromise} from './apiClient.js';

export function getDummyJsonAsPromise() {
    return apiGetAsPromise({
        url: `${getSpaHost()}src/build/myapp/mock/dummy.json`,
        cache: true,
    });
}
