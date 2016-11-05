export function catchTooltip(board) {
	$(board).on("hover", ".board-post", function( event ) {
		console.info('BoardPost mouseover')
        event.stopPropagation();
        $(this).find('.tooltip')
        	.toggleClass('tooltip-active')
    });
}