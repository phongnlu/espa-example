import '../../../node_modules/espa/barebone.js';
import {polyfill} from './utils.js';
import {registerRoutes} from './services/routeRegistration.js';

ESPA.store.set('app/context/name', 'myapp');
if (!ESPA.store.get('app/context/mode')) {
    ESPA.store.set('app/context/mode', 'non-test');
}

if (ESPA.store.get('app/context/mode') === 'non-test') {
    polyfill([
        'Object.assign',
        'Object.defineProperties',
        'Object.entries',
        'Object.keys',
        'Object.values',
        'fetch',
        'Promise',
    ], main);
}

export function main() {
    registerRoutes();
    // auto start the first route
    ESPA.navigate('foo');
}
