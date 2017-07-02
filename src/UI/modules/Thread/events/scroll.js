import { isFunction } from '~/utils/types';

const {
    headerHeight,
    threadpostScrollDuration,
    threadpostScrollHighlightDuration
} = window.appSettings;

const createPostScroller = ( $context, onScroll ) => {

    return function (href) {
        const $item = $context.find(href);

        $item.velocity('scroll', {
            container: $context,
            duration: threadpostScrollDuration,
            offset: -headerHeight
        });

        isFunction(onScroll) && onScroll();

        $item.addClass('highlight');
        setTimeout(() => $item.removeClass('highlight'),
            threadpostScrollHighlightDuration
        );
    }
}

export default createPostScroller;
