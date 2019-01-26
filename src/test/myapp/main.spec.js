/* eslint-disable no-console, no-invalid-this */

import * as mainCtrl from 'src/build/myapp/main.js';

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

        mainCtrl.main();
        ESPA.navigate.should.have.been.calledWith('foo');
        ESPA.navigate.restore();
    });
});
