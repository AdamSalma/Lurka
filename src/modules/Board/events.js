// TODO: Sort this out
export function catchTooltip(board) {
	$(board).on("hover", ".BoardPost", function( event ) {
		console.info('BoardPost mouseover')
        event.stopPropagation();
        $(this).find('.tooltip')
        	.toggleClass('tooltip-active')
    });
}
