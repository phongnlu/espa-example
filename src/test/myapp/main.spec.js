import * as mainCtrl from 'src/build/myapp/main.js';

describe('main controller', () => {
    beforeEach(function() {
        console.log("\n");
        console.log("=====================================================================");
        console.log("| STARTED: " + this.currentTest.title);   
        console.log("=====================================================================");         
    });

    afterEach(function() {
        console.log("=====================================================================");
        console.log("| FINISHED: " + this.currentTest.title);   
        console.log("=====================================================================");
        console.log("\n");        
    });

    it('should navigate to foo', () => {        
        sinon.spy(ESPA, 'navigate');

        mainCtrl.main();
        ESPA.navigate.should.have.been.calledWith('foo');            
        ESPA.navigate.restore();            
    });
});