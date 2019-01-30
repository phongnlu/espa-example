/* eslint-disable no-console, no-invalid-this */

import * as mainCtrl from 'src/build/myapp/main.js';
import * as localeSvc from 'src/build/myapp/services/localization.js';
import localeJson from 'src/build/myapp/locale/en.json';

describe('main controller', () => {
    ESPA.store.set('app/context/mode', 'test');

    beforeEach(function() {
        console.log('\n');
        console.log('=====================================================================');
        console.log(`| STARTED: ${this.currentTest.parent.title} - ${this.currentTest.title}`);
        console.log('=====================================================================');
    });

    afterEach(function() {
        console.log('=====================================================================');
        console.log(`| FINISHED: ${this.currentTest.parent.title} - ${this.currentTest.title}`);
        console.log('=====================================================================');
        console.log('\n');
    });

    it('should navigate to foo', () => {
        sinon.stub(ESPA, 'navigate').callsFake(() => {});
        sinon.stub(localeSvc, 'loadLocaleAsPromise').resolves(localeJson);

        return mainCtrl.main()
            .then(() => {
                ESPA.navigate.should.have.been.calledWith('foo');
                ESPA.navigate.restore();
                localeSvc.loadLocaleAsPromise.restore();
                return;
            });
    });
});
