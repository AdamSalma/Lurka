

export default function createLayout(options) {
    var {
        margin = 25,
        gutterLeft = 60,
        gutterRight = 60,
        gutterTop = 0,
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
        var min, index, leftPos;

        console.warn("blocks before:", blocks);
        $items && $items.each(function() {
            min = Math.min.apply(Math, blocks)
            index = blocks.indexOf(min)
            leftPos = gutterLeft + outerMargin/2 + margin/2 + (index * colWidth)

            this.style.top = gutterTop + min + 'px'
            this.style.left = leftPos + 'px'

            blocks[index] = min + this.offsetHeight + margin
        });

        console.info("blocks after:", blocks);
    }
}
