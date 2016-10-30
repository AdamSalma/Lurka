var colCount = 0
var colWidth = 0
var minMargin = 20
var margin = 0
var windowWidth = 0
var blocks = []

var $items = null

$(window).resize(setupBlocks)

export default function setupBlocks() {
	$items = $('.board-post')
	windowWidth = $(window).width()
	colWidth = $items.outerWidth()
	blocks = []
	colCount = Math.floor(windowWidth/(colWidth+minMargin*2))
	margin = (windowWidth - colWidth*colCount) / colCount - minMargin + 5
	for (let i=0; i<colCount; i++) {
		blocks.push(margin)
	}
	positionBlocks()
}

function positionBlocks() {
	$items.each(function(){
		var min = Array.min(blocks)
		var index = $.inArray(min, blocks)
		var leftPos = margin+(index*(colWidth+margin))
		$(this).css({
			'top': min+'px',
			'left': leftPos+'px'
		})
		blocks[index] = min+$(this).outerHeight()+margin
	})	
}

// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array)
}