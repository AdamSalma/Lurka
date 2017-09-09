import { createSelector } from 'reselect'

export const getPostIsOpen = state => state.post.isOpen
export const getPostPosition = () => {
    const config = window.appSettings

    if (window.innerWidth < config.postPositionLeftBreakpoint) {
        return "center"
    }

    return "left"
}
