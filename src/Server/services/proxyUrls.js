import query from 'querystring';

const proxyPath = '/proxy'

export default function proxify(resource) {
    return proxyPath + "?" + query.stringify({resource})
}
