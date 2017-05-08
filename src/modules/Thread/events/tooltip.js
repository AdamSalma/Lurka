import { isElementInViewport } from '~/utils/dom'

var tooltipNode;
var $highlightedPost;

export const createTooltip = (event) => {
    const target = event.target,
          href = target.getAttribute('href'),
          $post = $thread.find(href),
          post = $post.html(),
          linkPos = target.getBoundingClientRect()  // position of link

    if (isElementInViewport($post)){
        $post.addClass('highlight')
        $highlightedPost = $post
        return
    }

    let left, top, el = document.createElement('div')

    el.innerHTML = post
    el.className = 'ThreadPost tip'

    document.body.appendChild(el)

    left = linkPos.left

    /* Check if would render out of page vertically */
    console.groupCollapsed('%c Tooltip', 'color:gold')

    // render above - default
    top = linkPos.top - el.offsetHeight - 5

    if (top < headerHeight ) {
        // top of element overflowed
        console.log("top overflowed")

        // render below
        top = linkPos.bottom + 5

        // check if bottom will overflow
        if (top + el.offsetHeight > window.innerHeight) {
            // center element around link
            console.warn("bottom overflowed")

            top = linkPos.top - (el.offsetHeight / 2) - target.offsetHeight / 2
            left = linkPos.right + 5

            if (top < headerHeight || top + el.offsetHeight > window.innerHeight) {
                // element overflows; render at top of window
                console.warn("Can't center. Placed at top.")
                top = headerHeight+2 // 2 == header margin
            }
        }
    }

    // Check if right side overflows
    if (left + el.offsetWidth > window.innerWidth) {
        left = linkPos.left - el.offsetWidth - 5
    }

    // top = linkPos.top - el.offsetHeight - 5

    // if (top < 0) {
    //     // top of element overflowed
    //     console.log("top of element overflowed")
    //     // render below
    //     top = target.offsetHeight + el.offsetHeight + 5

    //     // check if bottom will overflow
    //     if (top + el.offsetHeight > window.innerHeight) {
    //         // center elementm around link
    //         console.warn("bottom overflowed")

    //         top = window.innerHeight - (linkPos.top + el.offsetHeight) / 2
    //         left = linkPos.right + 4

    //         if (top < 0 || top + el.offsetHeight > window.innerHeight) {
    //             console.warn("top = 0")
    //             // element overflows; render at top of window
    //             top = 2
    //         }
    //     }
    // }

    console.log(`top: ${top}, left: ${left}, el.offsetHeight: ${el.offsetHeight} linkPos.top: ${linkPos.top}`);

    let style = el.style
    style.top = top + 'px'
    style.left = left + 'px'

    tooltipNode = el
    console.groupEnd()
}

export const destroyTooltip = () => {
    if (tooltipNode) {
      document.body.removeChild(tooltipNode);
      tooltipNode = null;
    } else if ($highlightedPost) {
        $highlightedPost.removeClass('highlight')
        $highlightedPost = null;
    }
}
