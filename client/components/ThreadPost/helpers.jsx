import React from "react";

export function createImage(ID, SRC) {
    return (
        <div className='img-container' onClick={toggleImage.bind(null, ID, SRC)}>
            <span className="fullscreen hidden fa-stack fa-sm">
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-expand fa-stack-1x"></i>
            </span>
            <img id={ID} src={SRC.sm}/>
        </div>
    )
}

export function createWebm() {
    console.log('Webm creation attempted');
}

function toggleImage(ID, SRC) {
    const img = $('#'+ID)
    const icon = img.prev()

    if (img.attr('src') === SRC.sm) {
        // blur small image while large image is loading
        img.addClass('image-loading')
           .on('load', function(){
                // remove blur + show fullscreen icon
                img.removeClass('image-loading')
                   .off('load');
                icon.removeClass('hidden');
           })

        img.attr('src', SRC.lg);
    } else {
        // revert to thumbnail image
        img.attr('src', SRC.sm);
        icon.addClass('hidden');
    }
}