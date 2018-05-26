/**
 * Allows only one instance of a class to be created. Uses a closure to reuse
 * the pattern with any class as an input.
 *
 * Usage:
 *   const MySingletonClass = Singleton(Myclass);
 *
 *   MySingletonClass() === MySingletonClass()  // true
 *
 * @param  {Class}      Class
 * @return {Function}   Class instance getter
 */
export const Singleton = (Class) => (() => {
    var instance;
    return (...args) => {
        if (!instance) {
            instance = new Class(...args);
        }
        return instance;
    }
})();
