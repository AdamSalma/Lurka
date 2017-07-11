import { isFunction } from '~/utils/types';

const {
    headerHeight,
    threadpostScrollDuration,
    threadpostScrollHighlightDuration
} = window.appSettings;

const createPostScroller = ( $context, onScroll ) => {

    return function ({ href, highlightPost=true, scrollDuration=threadpostScrollDuration, highlightDuration=threadpostScrollHighlightDuration, offset=0 }) {

        if (!href) {
            throw new Error("No href provided to thread scroller.")
        }

        if (href[0] !== "#") {
            href = "#p" + href
        }

        console.log("scrolling to " + href);

        const $item = $context.find(href);

        $item.stop().velocity('scroll', {
            container: $context,
            duration: scrollDuration,
            // easing: "ease-out",
            easing: [0.445, 0.05, 0.55, 0.95],
            offset: offset
            // offset: -headerHeight
        });

        isFunction(onScroll) && onScroll();

        if (highlightPost) {
            $item.addClass('highlight');
            setTimeout(() => $item.removeClass('highlight'), highlightDuration);
        }

    }
}

export default createPostScroller;
