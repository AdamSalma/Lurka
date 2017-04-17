export function toggleNavbar({open=null, duration=400, delay=0, easing='ease-in'}={}) {
    console.log('toggleNavbar()')
    const $navbar = $('#navbar');
    const closeNavbar = parseInt($navbar.position().left) < 0

    let set = open !== null
    var left

    if ((set && open) || closeNavbar) {
        left = 0;
        easing = [0.215, 0.61, 0.355, 1]
    } else {
        left = `-${$navbar.width()}px`;
        duration = 300
    }

    return (dispatch, getState) => {
        if (!shouldToggleNavbar(getState(), closeNavbar))
            return

        dispatch(navbarToggle(closeNavbar))
        $navbar.velocity("stop");
        return $navbar.velocity(
            {left}, {duration, easing, delay}
        ) 
    }
}

function navbarToggle(navbarIsOpen) {
    return {
        type: NAVBAR_TOGGLED,
        payload: navbarIsOpen
    }
}

function shouldToggleNavbar({ status: isNavbarOpen}, closeNavbar) {
    return isNavbarOpen !== closeNavbar
}
