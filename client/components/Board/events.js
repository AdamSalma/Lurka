export function catchTooltip(board) {
	$(board).on("mouseenter", ".board-post", function( event ) {
		console.info('UAUUU')
        event.stopPropagation();
        $(this)
        	.find('.tooltip')
        	.toggleClass('tooltip-active')
    });
}