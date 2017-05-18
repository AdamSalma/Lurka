const toString = Object.toString;

export const isArray = function(value) {
    return toString.call(value) == '[object Array]';
}

export const isObject = function(value) {
    // This is a very simple check, but it’s good enough for what i need.
    return toString.call(value) == '[object Object]';
}

export const isString = function(value) {
    return typeof value == 'string' ||
        toString.call(value) == '[object String]';
}

export const isNumber = function(value) {
    return typeof value == 'number' ||
        toString.call(value) == '[object Number]';
}

export const isFunction = function(value) {
    return typeof value == 'function' ||
        toString.call(value) == '[object Function]';
}

export const isMap = function(value) {
    return toString.call(value) == '[object Map]';
}

export const isSet = function(value) {
    return toString.call(value) == '[object Set]';
}
