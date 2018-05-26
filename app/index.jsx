import 'babel-polyfill';
import 'velocity-animate';
import 'nanoscroller';

import 'config/globals';
import './themes';
import './sass/base';
import './events/setup';
import './utils/logger';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import Axios from 'axios'

render(App);

// Re-renders the application on src change
if (module.hot) {
  module.hot.accept(() => {
    const NextApp = require('./components/App').default;
    render(NextApp);
  });
}

// Hoisted
function render(App) {
    ReactDOM.render(<App />, document.querySelector('#App'));
}

window.postMessage = (data, url) => {
    console.warn("*postMessage* to", url, data)
    Axios.post(url, data, {
        'Host': "www.4chan.org",
        'Origin': "www.4chan.org",
        'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0",
        'DNT': 1,
        'Referer': null
    }).then(res => {
        console.log("%cResponse:", "color: gold; background: #444", res)
        // var event = document.createEvent('CustomEvent');
        // event.initCustomEvent("message", true, true, res.data);
        var event = new CustomEvent("message", {
            detail: res.data
        })
        window.dispatchEvent(event);
    }).catch(err => {
        console.log(err)
        console.log(err.response)
        err.response && console.log(err.response.data);
    })
}

window.addEventListener("message", (event) => {console.warn("OI YOU", event)}, false)
