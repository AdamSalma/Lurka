/**
 * Traverses up the DOM until an element is found that contains the passed in
 * class
 *
 * @param  {Object} el   - The initial DOM element reference
 * @param  {String} clss - Name of the class to check for
 * @return {Object}      - The first DOM element that has the specified class
 */
export const findParentWithClass = (el, clss) => {
    while (true) {
        if (el.classList.contains(clss)) {
            break;
        }
        el = el.parentNode;
    }
    return el;
}


// http://stackoverflow.com/a/7557433
export const isElementInViewport = (el) => {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= $(window).height() &&
        rect.right <= $(window).width()
    );
}
