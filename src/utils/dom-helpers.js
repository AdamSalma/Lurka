/**
 * Traverses up the DOM until an element is found that contains the passed in 
 * class
 * 
 * @param  {Object} el   - The initial DOM element reference
 * @param  {String} clss - Name of the class to check for
 * @return {Object}      - The first DOM element that has the specified class
 */
export function findParentWithClass(el, clss) {
    while (true) {
        if (el.classList.contains(clss)) {
            break
        }
        el = el.parentNode
    }
    return el
}
