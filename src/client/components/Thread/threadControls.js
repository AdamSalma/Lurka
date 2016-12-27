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

    // Check if would render out of page horizontally
    left = linkPos.left - (el.offsetWidth - target.offsetWidth) / 2

    if (left < 0) {
        left = linkPos.left + 2
        el.classList.add('tip-right')
    }

    else if (left + el.offsetWidth > document.documentElement.clientWidth) {
        left = linkPos.left - el.offsetWidth + target.offsetWidth + 2
        el.classList.add('tip-left')
    }

    // Check if would render out of page vertically
    top = linkPos.top - el.offsetHeight - 5

    if (top < 0) {
        top = top + target.offsetHeight + el.offsetHeight + 5
    }

    console.log(`top: ${top}, left: ${left}, el.offsetHeight: ${el.offsetHeight} linkPos.top: ${linkPos.top}`);

    let style = el.style
    style.top = (top + window.pageYOffset) + 'px'
    style.left = left + window.pageXOffset + 'px'

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
        scrollTop: offset
    }, 600);

    $post.addClass('highlight')
    setTimeout(()=>$post.removeClass('highlight'), 2000)
}

// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
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
