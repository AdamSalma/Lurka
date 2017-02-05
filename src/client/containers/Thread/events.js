import screenfull from 'screenfull';

var $thread;
var tooltipNode;
var $highlightedPost;

export function setupQuoteEvents(thread) {
    if (!$thread) $thread = $(thread);

    $thread.on('click mouseenter mouseleave', '.quotelink', function(event) {
        event.stopPropagation();

        const href = event.target.getAttribute('href')
        if (/\/[a-z]/i.test(href)) {
            // href has letters; should have numbers only
            // TODO: newThreadRequest()
            console.warn("href is invalid. Handle this")
            return false
        }

        switch (event.type) {
            case 'click':
                return scrollToPost(href)
            case 'mouseenter':
                return createTooltip(event);
            case 'mouseleave':
                return destroyTooltip(event);
            default:
                throw new Error(`Uncaught event: ${event.type}`)
        }
    })
}

const threadWidth = $('#thread').width()
function createTooltip(event) {
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
    el.className = 'thread-post tip'

    document.body.appendChild(el)

    left = linkPos.left

    /* Check if would render out of page vertically */

    // render above - default
    top = linkPos.top - el.offsetHeight - 5

    if (top < 0 ) {
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
            
            if (top < 0 || top + el.offsetHeight > window.innerHeight) {
                console.warn("Can't center. top = 0")
                // element overflows; render at top of window
                top = 2 // + header margin
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
}

function destroyTooltip() {
    if (tooltipNode) {
      document.body.removeChild(tooltipNode);
      tooltipNode = null;
    } else if ($highlightedPost) {
        $highlightedPost.removeClass('highlight')
        $highlightedPost = null;
    }
}


function scrollToPost( href ) {

    const $post = $thread.find(href)
    const offset = $post[0].offsetTop

    console.log(`scroll offset is ${offset}`)

    $thread.animate({
        scrollTop: offset - 60
    }, 600);

    $post.addClass('highlight')
    setTimeout(()=>$post.removeClass('highlight'), 2000)
}

// http://stackoverflow.com/a/7557433
function isElementInViewport(el) {
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

// TODO: (media fullscreen) needs refactoring; use materialIcons and change img src toggle -> 2 images
export function enableFullscreen(thread) {
    if (!$thread) $thread = $(thread);

    $thread.on('click', '.fa-stack', function(event){
        event.stopPropagation()
        if (screenfull.enabled) {
            const target = $(event.target)
                                .parents('.fullscreen')
                                .next()
            console.warn(target);
            screenfull.toggle(target[0]);
            target.one('click', function(){
                screenfull.toggle(target[0]);
            });
        }
    });
}
