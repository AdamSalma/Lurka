const onBeforeSendHeaders = (details, callback) => {
    if (process.env.NODE_ENV === "development" && !details.url.includes('4cdn')) {
        // webpack-dev-server doesn't like its headers played with
        return callback({ cancel:false })
    }

    // Bypass 4chan media block (occurs when referer is localhost)
    if (details.url.includes('a.4cdn.org')) {
        details.requestHeaders['Host'] = "a.4cdn.org";
        details.requestHeaders['Origin'] = "http://boards.4chan.org";
    } else {
        details.requestHeaders['Host'] = "i.4cdn.org";
    }

    details.requestHeaders['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0";
    details.requestHeaders['DNT'] = 1;
    details.requestHeaders['Referer'] = undefined;

    callback({
        cancel: false,
        requestHeaders: details.requestHeaders
    });
}

export default onBeforeSendHeaders;
