const { headerHeight } = Lurka.settings;

export const animationStyles = {
    in: {
        translateY: [headerHeight, "100vh"],
        translateZ: 0, // Force hardware acceleration by animating a 3D property
        scale: [1,1],
        opacity: [1, 1],
    },
    // out: {
    //     translateY: [window.innerHeight, headerHeight],
    //     translateZ: 0,
    // }
    out: {
        // scale: 0,
        opacity: 0,
        // translateY: [window.innerHeight, headerHeight],
        translateZ: 0,
    }
}

export const animationOptions = {
    in: {
        duration: 800,  // this too
        easing: [0.19, 1, 0.22, 1],       // ease out expo
        // easing: [0.23, 1, 0.32, 1],       // ease out quint
    },
    out: {
        duration: 400,
        // easing: [0.25, 0.8, 0.25, 1],
        // easing: [0.23, 1, 0.32, 1],       // ease out quint
        easing: [0.19, 1, 0.22, 1],       // ease out expo
    }
}

export const scrollConfig = {
    highlightPost: false,
    headerOffset: 14,  // for determining if media (top) is below or above header
    imageOffset: 52,
    postOffset: 0,
    closeDuration: 0,
    openDuration: 400,
    openEase: 'ease'
}
