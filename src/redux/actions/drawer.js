import * as types from '~/redux/types'

const drawerWidth = window.appSettings.drawerWidth
const drawerAnimationDuration = window.appSettings.drawerAnimationDuration

export const toggleDrawer = (open=null, callback=()=>{}) => {
    return (dispatch, getState) => {
        let right

        if (open !== null) {
            if (open) {
                right = 0
            } else {
                right = -drawerWidth
            }
        } else {
            right = getState().display.isDrawerOpen ? -drawerWidth : 0
        }

        dispatch(drawerToggled(right === 0))

        return $("#drawer").velocity({right: right + "px"}, {
            duration: 400,
            complete: () => {
                callback()
            }
        })
    }
}

const drawerToggled = isOpen => {
    return {
        type: types.DRAWER_TOGGLED,
        payload: isOpen
    }
}
