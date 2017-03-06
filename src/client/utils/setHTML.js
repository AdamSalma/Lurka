export default function setHTML(html) {
    return {
        dangerouslySetInnerHTML: {
            __html: html
        }
    }
}
