import { PubSubEs6, config } from 'pub-sub-es6';
import { env } from '-/config';

if (env.development) {
    config.enableDebugger = true
    config.trace = true
}

global.PubSub = PubSubEs6
