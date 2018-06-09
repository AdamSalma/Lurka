import {createTooltipCreator, destroyTooltip} from './tooltip';
import createPostScroller from './scroll';
import setupFullscreen from './media';


export default function setupThreadEvents(thread) {
    var $thread = $(thread);
    // if (!$thread) {
    //     $thread = $(thread);
    // }

    setupFullscreen($thread);
    const scrollToPost = createPostScroller($thread, destroyTooltip);
    const createTooltip = createTooltipCreator($thread);

    $thread.on('click mouseenter mouseleave', '.quotelink', function(event) {
        event.stopPropagation();
        event.preventDefault();

        const href = event.target.getAttribute('href');
        if (/\/[a-z]/i.test(href)) {
            // href has letters; should have numbers only
            // TODO: newThreadRequest()
            console.warn("href is invalid. Handle this");
            return false;
        }

        switch (event.type) {
            case 'click':
                return scrollToPost(href);;
            case 'mouseenter':
                return createTooltip(event);;
            case 'mouseleave':
                return destroyTooltip(event);;
            default:
                throw new Error(`Uncaught event: ${event.type}`);
        }
    })

    window._test = function () {
        destroyTooltip()
        $thread.off("click mouseenter mouseleave", ".quotelink");
        $thread = null
    }

    return {
        scrollToPost,
        createTooltip,
        destroyTooltip,
        teardownThreadEvents: function() {
            destroyTooltip()
            $thread.off("click mouseenter mouseleave", ".quotelink");
            $thread = null
        }
    }
}
