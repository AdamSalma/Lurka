export function fullscreenImageDelegation(thread) {
	$(thread).on('click', '.fa-stack', function(event){
        event.stopPropagation()
        if (screenfull.enabled) {
            const target = $(event.target)
                                .parents('.fullscreen')
                                .next()[0]
            console.warn(target);
            screenfull.toggle(target);
        }
    });
}