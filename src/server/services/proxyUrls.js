import query from 'query-string'
const route = '/media'

/**
 * Takes a url and returns a new href that routes to /media with the url as 
 * a parameter
 * @param  {[type]} options.url      - external media href
 * @param  {[type]} options.provider - content provider; 4cha, reddit etc
 * @return {[type]}                  - internal href with url as a param
 */
export default function proxify({ url, provider }) {
    const parsed = query.parse(route)
    log.info(`parsed: ${parsed}`)
    throw new Error
    parsed.url = url
    parsed.provider = provider
    return query.stringify(parsed)

    return `${route}?` query.stringify({
        url: url,
        provider: provider
    })
}