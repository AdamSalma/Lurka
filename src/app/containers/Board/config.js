const {
    boardPostMargin,
    headerHeight,
    subheaderHeight,
    settingsWidth,
    boardOuterMargin
} = window.appSettings;


export const masonryGrid = {
    targetSelector: '.BoardPost',
    containerSelector: '#board',
    margin: boardPostMargin,
    gutterLeft: boardOuterMargin,
    gutterRight: boardOuterMargin,
    gutterTop: 0
}

export const masonryGridWithDrawer = Object.assign({}, masonryGrid, {
    gutterRight: settingsWidth + boardOuterMargin
})

export const nano = {
    sliderMaxHeight: 400,
    sliderMinHeight: 50
}

export default {
    masonryGrid,
    masonryGridWithDrawer,
    nano
}
