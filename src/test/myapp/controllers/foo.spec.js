/* eslint-disable no-console, no-invalid-this */

import * as fooCtrl from 'src/build/myapp/controllers/foo.js';
import * as dummySvc from 'src/build/myapp/services/dummy.js';

describe('foo controller', () => {
    ESPA.store.set('app/context/mode', 'test');

    const dummyJson = {
        'data': {
            'foo': 'Hello Foo',
            'bar': 'Hello Bar',
        },
    };

    before(() => {
        sinon.stub(ESPA.loadResource, 'css').resolves('css loaded');
        fooCtrl.factory();
    });

    after(() => {
        ESPA.loadResource.css.restore();
    });

    beforeEach(function() {
        console.log('\n');
        console.log('=====================================================================');
        console.log(`| STARTED: ${this.currentTest.parent.title} - ${this.currentTest.title}`);
        console.log('=====================================================================');

        // remove old elements first
        let el = document.getElementById('main-container');
        el && document.body.removeChild(el);
        el = document.getElementById('main-content');
        el && document.body.removeChild(el);
        el = document.getElementById('loader');
        el && document.body.removeChild(el);
        // create elements for testing
        el = document.createElement('div');
        el.id = 'main-container';
        document.body.appendChild(el);
        el = document.createElement('div');
        el.id = 'main-content';
        document.body.appendChild(el);
        el = document.createElement('div');
        el.id = 'loader';
        document.body.appendChild(el);
    });

    afterEach(function() {
        console.log('=====================================================================');
        console.log(`| FINISHED: ${this.currentTest.parent.title} - ${this.currentTest.title}`);
        console.log('=====================================================================');
        console.log('\n');

        dummySvc.getDummyJsonAsPromise.restore();
    });

    it('_displayView should be called', () => {
        sinon.stub(dummySvc, 'getDummyJsonAsPromise').resolves(dummyJson);

        return fooCtrl._registerRouteCallback()
            .then(() => {
                const el = document.getElementById('main-content');
                expect(el.innerHTML).that.does.include(dummyJson.data.foo);
                return;
            });
    });
});
