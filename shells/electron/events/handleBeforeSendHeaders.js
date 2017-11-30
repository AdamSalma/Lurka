const onBeforeSendHeaders = (details, callback) => {
    if (process.env.NODE_ENV === "development") {
        if (details.url.includes('localhost')) {
            // webpack-dev-server doesn't like its headers played with
            return callback({ cancel:false })
        }
    }

    console.log("URL:" , details.url)

    const isBoard = details.url.includes('a.4cdn')
    const isImage = details.url.includes('4cdn')
    // Bypass 4chan media block (occurs when referer is localhost)
    if (isBoard) {
        details.requestHeaders['Host'] = "a.4cdn.org";
        details.requestHeaders['Origin'] = "http://boards.4chan.org";
    }
    else if (isImage) {
        details.requestHeaders['Host'] = "i.4cdn.org";
    }
    else {
        // Is captcha
        console.log("Special URL:", details.url);
        // details.requestHeaders['Host'] = "a.4cdn.org";
        details.requestHeaders['Host'] = "www.4chan.org";
        details.requestHeaders['Origin'] = "http://boards.4chan.org";
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
