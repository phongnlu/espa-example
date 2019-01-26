import {factory as factoryFoo} from '../controllers/foo.js';
import {factory as factoryBar} from '../controllers/bar.js';

export function registerRoutes() {
    // your routes here
    factoryFoo();
    factoryBar();

    // reset the default route
    ESPA.navigate('/');
}
