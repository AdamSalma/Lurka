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
    ReactDOM.render(<App/>, document.querySelector('#App'));
}

process.on("uncaughtException", function(err) {
    console.error("uncaughtException:", err);
});

import Axios from 'axios'
((post) => {
    window.postMessage = (data, url, target) => {
        console.warn("*postMessage* to:\n\tUrl:", url, "\n\tData:", data, "\n\tTarget:", target)
        return post(data, url, target);
    }
})(window.postMessage)

// const originalPostMessage = window.postMessage
// global.postMessage = window.postMessage = (data, url, target) => {
//   // console.error("*postMessage* to:\n\tUrl:", url, "\n\tData:", data, "\n\tTarget:", target)

//   return originalPostMessage(data, url, target);
//   // var cache_bust = 1
//   target = target || parent;

//   // if (url === "*") {
//   //     console.error("'all' url sent. Using originalPostMessage")
//   // }

//   // target.location = url.replace( /#.*$/, '' ) + '#' + (+new Date) + (cache_bust++) + '&' + data;
//   Axios.post(url, data, {
//     Host: "www.4chan.org",
//     Origin: "www.4chan.org",
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0",
//     DNT: 1,
//     Referer: null
//   })
//     .then(res => {
//       console.error(
//         "Response from:\n\tUrl:",
//         url,
//         "\n\tData:",
//         data,
//         "\n\tTarget:",
//         target,
//         "\nResponse:",
//         res
//       );
//       // var event = document.createEvent('CustomEvent');
//       // event.initCustomEvent("message", true, true, res.data);
//       var event = new CustomEvent("message", {
//         data: res.data,
//         origin: url,
//         source: target
//       });

//       if (global.captchaIframeWindow) {
//         captchaIframeWindow.dispatchEvent(event);
//       }
//       target.dispatchEvent(event);
//       global.dispatchEvent(event);
//     })
//     .catch(err => {
//       console.log(err);
//       console.log(err.response);
//       console.log(err.response.data);
//     });
// };

// window.addEventListener("message", (event) => {
//     console.error("Event received:", event)
// }, false)



// (function(open) {

//     XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

//         console.error("XMLHttpRequest:", method, url);

//         // this.addEventListener("readystatechange", function() {
//         //     console.log(this.readyState); // this one I changed
//         // }, false);

//         open.call(this, method, url, async, user, pass);
//     };

// })(XMLHttpRequest.prototype.open);
