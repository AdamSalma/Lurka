import { createSelector } from 'reselect'

export const getPostIsOpen = state => state.post.isOpen
export const getPostPosition = () => {
    const {postPositionLeftBreakpoint} = Lurka.settings;

    if (window.innerWidth < postPositionLeftBreakpoint) {
        return "center"
    }

    return "left"
}
