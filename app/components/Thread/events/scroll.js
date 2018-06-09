import { isFunction, isString, isJQueryElement } from '~/utils/types';

const {
    headerHeight,
    threadpostScrollDuration,
    threadpostScrollHighlightDuration
} = Lurka.settings;

const isRequired = () => { throw new Error('param is required'); };

const createPostScroller = ( $context, onScroll ) => {
    console.log("Thread scroller created");

    return function (target=isRequired(), {
        highlightPost = true,
        highlightDuration = threadpostScrollHighlightDuration,
        scrollDuration = threadpostScrollDuration,
        offset = 0,
        easing = [0.445, 0.05, 0.55, 0.95]
    }={}) {
        console.log("Thread is scrolling...")
        let $item;

        if (isJQueryElement(target)) {
            $item = target;
        } else {
            $item = $context.find(target)
        }

        console.log("Scrolling to:", $item);

        $item.stop().velocity('scroll', {
            container: $context,
            duration: scrollDuration,
            easing: easing,
            offset: offset
        });

        isFunction(onScroll) && onScroll();

        if (highlightPost) {
            $item.addClass('highlight');
            setTimeout(() => $item.removeClass('highlight'), highlightDuration);
        }

    }
}

export default createPostScroller;
