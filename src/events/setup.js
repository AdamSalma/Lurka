import { PubSubEs6, config } from 'pub-sub-es6';
import { isProduction } from '-/config';

if (!isProduction) {
    config.enableDebugger = true
    config.trace = true
}

global.PubSub = PubSubEs6
