const { headerHeight } = window.appSettings;

export const animationStyles = {
    in: {
        translateY: [headerHeight, "100vh"],
        translateZ: 0, // Force hardware acceleration by animating a 3D property
    },
    out: {
        translateY: [window.innerHeight, headerHeight],
        translateZ: 0,
    }
}

export const animationOptions = {
    in: {
        duration: 800,  // this too
        easing: [0.165, 0.84, 0.44, 1],
    },
    out: {
        duration: 400,
        easing: [0.25, 0.8, 0.25, 1],
    }
}
