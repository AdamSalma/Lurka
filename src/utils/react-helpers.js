/**
 * Bind methods to a class. Use in class init: `constructor(){ }`
 * 
 * @param  {Object}  that    - Class scope reference; 'this'
 * @param  {...Func} members - Methods
 * @return {undefined}
 */
export const bindMembersToClass = (that, ...members) => {
    members.forEach(item => {
        that[item] = that[item].bind(that)
    })
}

/**
 * Bind external functions to a class instance to be used as methods. 
 * Use in class init: `constructor(){ }`
 * 
 * @param  {Object}  that    - Class scope reference; 'this'
 * @param  {...Func} members - Functions
 * @return {undefined}
 */
export const bindFunctionsAsInstanceMethods = (that, ...funcs) => {
    funcs.forEach(func => {
        that[func.name] = func.bind(that);
    });
}

/**
 * Shorthand for using dangerouslySetInnerHTML as an element prop
 * 
 * @param  {String} html - Raw html to insert
 * @return {Object}
 */
export const setHTML = (html) => {
    return {
        dangerouslySetInnerHTML: {
            __html: html
        }
    }
}
