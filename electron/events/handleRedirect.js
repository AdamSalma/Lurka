import open from 'open';

// Open links in external application (browser)
const handleRedirect = (e, url) => {
    console.warn("Opening " + url)
    e.preventDefault()
    open(url)
}

export default handleRedirect
