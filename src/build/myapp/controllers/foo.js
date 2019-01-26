import {getCss, bindEvents} from '../utils.js';
import {getDummyJsonAsPromise} from '../services/dummy.js';
import tpl from '../views/foo.html';

let viewData = null;
let serviceData = null;
let factoryScope = null;

const factory = ((injected) => {
    const self = {
        cfg: (injected && injected.cfg) ? injected.cfg : null,
        tpl: (injected && injected.tpl) ? injected.tpl : tpl,
    };

    // overridding
    factoryScope = ESPA.factoryMixin(self, injected);

    init();

    return factoryScope;
});

function init() {
    ESPA.registerRoute('foo', _registerRouteCallback);
}

function _registerRouteCallback(data) {
    viewData = data || {};

    return Promise.all([
        ESPA.loadResource.css(getCss()),
        getDummyJsonAsPromise(),
    ])
        .then((results) => {
            serviceData = results[1];
            viewData = Object.assign(viewData, serviceData);
            _displayView();
            return;
        })
        .catch((e) => {
            ESPA.logger.error(e);
            return Promise.reject({error: '_registerRouteCallback promise chain terminated'});
        });
}

function _displayView() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').innerHTML = ESPA.tmpl(factoryScope.tpl, viewData);
    document.getElementById('main-container').style.display = 'block';

    bindEvents({
        'click #go-to-bar': _onGoToBar,
    });
}

function _onGoToBar(e) {
    e.preventDefault();

    ESPA.navigate('bar');
}

export {factory, _registerRouteCallback};
