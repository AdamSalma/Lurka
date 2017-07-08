const onBeforeSendHeaders = (details, callback) => {

    details.requestHeaders['Host'] = "i.4cdn.org";
    details.requestHeaders['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0";
    details.requestHeaders['DNT'] = 1;
    details.requestHeaders['Referer'] = undefined;

    callback({
        cancel: false,
        requestHeaders: details.requestHeaders
    });
}

module.exports = onBeforeSendHeaders;
