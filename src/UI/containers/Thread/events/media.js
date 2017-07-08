import screenfull from 'screenfull';

// TODO: (media fullscreen) needs refactoring; use materialIcons and change img src toggle -> 2 images
export default function setupFullscreen($thread) {

    $thread.on('click', '.fa-stack', function(event){
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
