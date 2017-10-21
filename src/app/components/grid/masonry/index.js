

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
        columns

    return (reuseElements=false) => {
        discoverItems(reuseElements)
        positionItems()
    }

    function discoverItems(reuseElements) {
        if (!reuseElements) {
            $items = $(targetSelector)
        }

        // sometimes called before items are rendered
        if (!$items || !$items.length) return;

        columns = []
        containerWidth = $(containerSelector).width() - gutterRight - gutterLeft
        colWidth = $items.outerWidth() + margin
        colCount = Math.floor(containerWidth / colWidth)
        outerMargin = containerWidth - colCount * colWidth

        for (let i=0; i < colCount; i++) {
            columns.push(margin)
        }
    }

    function positionItems() {
        var min, index, leftPos;

        $items && $items.each(function() {
            min = Math.min.apply(Math, columns)
            index = columns.indexOf(min)
            leftPos = gutterLeft + outerMargin/2 + margin/2 + (index * colWidth)

            this.style.top = gutterTop + min + 'px'
            this.style.left = leftPos + 'px'

            columns[index] = min + this.offsetHeight + margin
        });
    }
}
