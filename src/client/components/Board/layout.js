var colCount = 0
var colWidth = 0
var margin = 20
var windowWidth = 0
var blocks = []

var $win = $(window)
var $items = null

$win.resize(setupBlocks)

export default function setupBlocks() {
	$items = $('.board-post')
	windowWidth = $win.width()
	colWidth = $items.outerWidth()
	blocks = []
	colCount = Math.floor(windowWidth/(colWidth+margin*2))
	for(var i=0; i<colCount; i++){
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
			'left':leftPos+'px',
			'top':min+'px'
		})
		blocks[index] = min+$(this).outerHeight()+margin
	})	
}

// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array)
}