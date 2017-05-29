const {
    headerHeight,
    threadpostScrollDuration,
    threadpostScrollHighlightDuration
} = window.appSettings;

export default function createPostScroller( $context ) {

    return function (href) {
        const $item = $context.find(href);
        // $context.animate({
        //     scrollTop: offset - headerHeight
        // }, threadpostScrollDuration);

        $item.velocity('scroll', {
            container: $context,
            duration: threadpostScrollDuration,
            offset: -headerHeight
        });

        $item.addClass('highlight');
        setTimeout(() => $item.removeClass('highlight'),
            threadpostScrollHighlightDuration
        );
    }
}
