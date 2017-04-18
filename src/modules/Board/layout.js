

export default function createLayout(options) {
    var {
        margin = 25,
        gutterLeft = 60,
        gutterRight = 60,
        targetSelector,
        containerSelector,
    } = options;

    var colCount,
        colWidth,
        outerMargin,
        $items,
        containerWidth,
        blocks

    return (reuseElements=false) => {
        discoverItems(reuseElements)
        positionItems()
    }

    function discoverItems(reuseElements) {
        if (!reuseElements) {
            $items = $(targetSelector)
        }

        // sometimes called before items are rendered
        if (!$items || !$items.length)
            return

        blocks = []
        containerWidth = $(containerSelector).width() - gutterRight - gutterLeft
        colWidth = $items.outerWidth() + margin
        colCount = Math.floor(containerWidth / colWidth)
        outerMargin = containerWidth - colCount * colWidth

        for (let i=0; i < colCount; i++) {
            blocks.push(margin)
        }
    }

    function positionItems() {
        $items && $items.each(function(){
            var min = Array.min(blocks)
            var index = $.inArray(min, blocks)
            var leftPos = gutterLeft + outerMargin/2 + margin/2 + (index * colWidth)
            $(this).css({
                'top': min+'px',
                'left': leftPos+'px'
            })

            blocks[index] = min + $(this).outerHeight() + margin
        })
    }
}


// Function to get the Min value in Array
Array.min = function(array) {
    return Math.min.apply(Math, array)
}
