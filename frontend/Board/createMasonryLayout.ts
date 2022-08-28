const defaults = {
  margin: 25,
  gutterLeft: 60,
  gutterRight: 60,
  gutterTop: 0,
  targetSelector: null,
  containerSelector: null,
};

/**
 * Creates a javascript grid allowing equal width items with varied heights.
 *
 * @param {Object} options
 * @param {Object} options.containerSelector - A CSS selector or element reference of the grid container.
 * @param {Object} options.targetSelector - A CSS selector to discover the grid item.
 * @param {Object} options.margin      - Optional. How much space (px) around each item.
 * @param {Object} options.gutterLeft  - Optional. A CSS selector to discover the grid item.
 * @param {Object} options.gutterRight - Optional. A CSS selector to discover the grid item.
 * @param {Object} options.gutterTop   - Optional. A CSS selector to discover the grid item.
 *
 * @return {Function} - Calling this function will apply the grid according with the above options.
 */
export default function createMasonryGrid(options = {}) {
  var opts = Object.assign({}, defaults, options);
  var gridItems;

  if (!opts.targetSelector || !opts.containerSelector) {
    throw new TypeError(
      "No values supplied for `targetSelector` and `containerSelector`."
    );
  }

  /**
   * Applies the grid to the DOM.
   *
   * @param {Boolean} shouldReuseItems - If true, will skip finding the DOM elements (for performance)
   */
  return function applyMasonryGrid(shouldReuseItems = false) {
    positionItems(discoverItems(shouldReuseItems));
  };

  // Internal function for setting up the grid structure in memory
  function discoverItems(shouldReuseItems) {
    if (!shouldReuseItems) {
      // No reuse. Get element references again.
      gridItems = document.querySelectorAll(opts.targetSelector);
    }

    // Can sometimes called before items are rendered; Skip
    if (!gridItems || !gridItems.length) return;

    const columns = [];
    const containerWidth =
      document.querySelector(opts.containerSelector).getBoundingClientRect()
        .width -
      opts.gutterRight -
      opts.gutterLeft;
    // const colWidth = gridItems.outerWidth() + opts.margin;
    const colWidth =
      document.querySelector(opts.containerSelector) + opts.margin;
    const colCount = Math.floor(containerWidth / colWidth);
    const outerMargin = containerWidth - colCount * colWidth;

    for (let i = 0; i < colCount; i++) {
      columns.push(opts.margin);
    }

    return {
      columns,
      colWidth,
      outerMargin,
    };
  }

  // Internal function for possitioning
  function positionItems(grid) {
    var min, index, leftPos;

    gridItems &&
      gridItems.forEach(function (element) {
        min = Math.min.apply(Math, grid.columns);
        index = grid.columns.indexOf(min);
        leftPos =
          opts.gutterLeft +
          grid.outerMargin / 2 +
          opts.margin / 2 +
          index * grid.colWidth;

        element.style.top = opts.gutterTop + min + "px";
        element.style.left = leftPos + "px";

        grid.columns[index] = min + element.offsetHeight + opts.margin;
      });
  }
}
