const {
    headerHeight,
    threadpostScrollDuration,
    threadpostScrollHighlightDuration
} = window.appSettings;

export default function createPostScroller( $context ) {

    return function (href) {
        const $item = $context.find(href);
        const offset = $item[0].offsetTop;

        console.log(`Post scrolled to has offset: "${offset}px"`);

        $context.animate({
            scrollTop: offset - headerHeight
        }, threadpostScrollDuration);

        $item.addClass('highlight');
        setTimeout(() => $item.removeClass('highlight'),
            threadpostScrollHighlightDuration
        );
    }
}
