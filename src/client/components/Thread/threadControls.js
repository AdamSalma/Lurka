import screenfull from 'screenfull';

var $thread;

export function setupQuoteEvents(thread) {
    if (!$thread) $thread = $(thread);

    $thread.on('click mouseenter mousemove mouseleave', '.quotelink', function(event) {
        event.stopPropagation();

        switch (event.type) {
            case 'click':
                return handleClick(event);
            case 'mouseenter':
                return createTooltip(event);
            case 'mouseleave':
                return destroyTooltip(event);
            default:
                // throw new Error(`Uncaught event: ${event.type}`)
                console.error("mousemove")
        }

        return false
    })
}

function createTooltip(event) {
    console.log(event);
    const href = event.target.getAttribute('href');
    const $post = $thread.find(href);
}

function destroyTooltip(event) {

}


function handleClick({ target }){
    let href = target.getAttribute('href')
    if (/\/[a-z]/i.test(href)) {
        // newThreadRequest()
        // href has letters; should have numbers only
        console.warn("href has letters handle this")
    } else {
        console.log("scrolling to post");
        scrollToPost(href)
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
