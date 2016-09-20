import screenfull from 'screenfull';

export function fullscreenImageDelegation(thread) {
	$(thread).on('click', '.fa-stack', function(event){
        event.stopPropagation()
        if (screenfull.enabled) {
            const target = $(event.target)
                                .parents('.fullscreen')
                                .next()
            console.warn(target);
            screenfull.toggle(target[0]);
            target.one('click', function(){
            	screenfull.toggle(target[0]);
            });
        }
    });
}