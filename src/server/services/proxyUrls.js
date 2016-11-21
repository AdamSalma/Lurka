import query from 'querystring';

export default function proxify(baseUrl, params) {
    return baseUrl + "?" + query.stringify(params)
}