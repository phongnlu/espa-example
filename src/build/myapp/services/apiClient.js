import {getApiHost} from '../utils.js';

export function apiGetAsPromise(obj) {
    // check cache
    const cache = ESPA.store.get(obj.url);
    if (cache) {
        ESPA.logger.debug(`return cached data for GET url=${obj.url}`);
        ESPA.trigger('/fetches/apiGET/' + obj.url + '/data', cache);
        return cache;
    }
    ESPA.logger.debug(`request: GET url=${obj.url}`);
    return _apiSend(obj.url, {
        method: 'GET',
    })
        .then(function(response) {
            ESPA.logger.debug(`response: ${obj.url}`, response);
            ESPA.trigger('/fetches/apiGET/' + obj.url + '/data', response);
            // cache data
            if (obj.cache) {
                ESPA.store.set(obj.url, response);
            }
            return response;
        })
        .catch(function(e) {
            ESPA.logger.error(e);
            throw new Error('apiGet error');
        });
}

export function apiPostAsPromise(obj) {
    ESPA.logger.debug(`request: POST url=${obj.url}, body=${JSON.stringify(obj.data)}`);
    return _apiSend(obj.url, {
        body: JSON.stringify(obj.data),
        method: 'POST',
    })
        .then(function(response) {
            ESPA.logger.debug(`response: ${obj.url}`, response);
            ESPA.trigger('/fetches/apiPost/' + obj.url + '/data', response);
            return response;
        })
        .catch(function(e) {
            ESPA.logger.error(e);
            throw new Error('apiPost error');
        });
}

function _apiSend(url, data) {
    return fetch(getApiHost() + url, Object.assign(data, {
        headers: _getHeaders(),
        credentials: 'include',
    }))
        .then(function(resp) {
            return resp.json();
        })
        .catch(function(e) {
            ESPA.logger.error(e);
            throw new Error('_apiSend error');
        });
}

function _getHeaders() {
    const tokenEl = document.querySelector('input[name="__RequestVerificationToken"]');
    const headers = {
        'Content-Type': 'application/json',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSRF-Token': tokenEl ? tokenEl.value : '',
    };
    return headers;
}
