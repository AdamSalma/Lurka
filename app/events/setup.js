import PubSubEs6 from 'pub-sub-es6';

PubSubEs6.config.trace = {
    dispatch: false,
    receive: false,
    unsubscribe: false,
    not_found_subscriber: false
};

global.PubSub = PubSubEs6
