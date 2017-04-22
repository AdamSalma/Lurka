import * as types from '~/redux/types'

const drawerWidth = window.appSettings.drawerWidth
const drawerAnimationDuration = window.appSettings.drawerAnimationDuration

export const toggleDrawer = (open=null, callback=()=>{}) => {
    return (dispatch, getState) => {
        const { isDrawerOpen } = getState().display

        if (open !== null && open === isDrawerOpen) {
            console.warn('Drawer toggle rejected')
            return
        }

        dispatch(drawerToggled(!isDrawerOpen))
    }
}

const drawerToggled = isOpen => {
    return {
        type: types.DRAWER_TOGGLED,
        payload: isOpen
    }
}
