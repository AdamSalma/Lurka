import { isElementInViewport } from '~/utils/dom'

var tooltipNode;
var $highlightedPost;

const { headerHeight, threadWidth } = window.appSettings;

const highlightClass = 'highlight';
const animateClass = ' ' + 'animate';
const tooltipClass = 'ThreadPost tip';
const tooltipMargin = 5

export const createTooltipCreator = ($thread) => {
    return function (event) {
        console.groupCollapsed('%c Tooltip', 'color:gold');

        const target = event.target,
              href = target.getAttribute('href'),
              $post = $thread.find(href),
              post = $post.html(),
              linkPos = target.getBoundingClientRect()  // position of link

        if (isElementInViewport($post)){
            $post.addClass(highlightClass)
            $highlightedPost = $post
            return
        }

        let left, top, el = document.createElement('div')

        el.innerHTML = post
        el.className = tooltipClass

        document.body.appendChild(el)

        // Set distance from left == to the hovered link
        left = linkPos.left

        // Set top to render above the link
        top = linkPos.top - el.offsetHeight - tooltipMargin

        // Check if would render out of page vertically
        if (top < headerHeight) {
            // top of element overflowed
            console.log("top overflowed")

            // render below
            top = linkPos.bottom + tooltipMargin

            // check if bottom will overflow
            if (top + el.offsetHeight > window.innerHeight) {
                // center element around link
                console.warn("bottom overflowed")

                top = linkPos.top - (el.offsetHeight / 2) - target.offsetHeight / 2
                left = linkPos.right + tooltipMargin

                if (top < headerHeight || top + el.offsetHeight > window.innerHeight) {
                    // element overflows; render at top of window
                    console.warn("Can't center. Placed at top.")
                    top = headerHeight+2 // 2 == header margin
                }
            }
        }

        // Check if right side overflows
        if (left + el.offsetWidth > window.innerWidth - threadWidth/2) {
            left = linkPos.left - el.offsetWidth/2 - 5;
        }

        console.log(`top: ${top}, left: ${left}, el.offsetHeight: ${el.offsetHeight} linkPos.top: ${linkPos.top}`);
        console.groupEnd()

        el.style.top  = top + 'px'
        el.style.left = left + 'px'

        el.className += animateClass

        tooltipNode = el
    }
}

export const destroyTooltip = () => {
    if (tooltipNode) {
        document.body.removeChild(tooltipNode);
        tooltipNode = null;
    } else if ($highlightedPost) {
        $highlightedPost.removeClass(highlightClass);
        $highlightedPost = null;
    }
}
