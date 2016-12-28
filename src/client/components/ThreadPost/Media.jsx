import React from "react";

export function createMediaIfExists(id, media) {
    if (!media) return;

    const {srcSmall, srcLarge, filetype} = media

    return (
        <div id={id} className='img-container' onClick={ () => toggleMedia(id, srcLarge, filetype)}>
            <div className="thumbnail">
                <img src={srcSmall} />
            </div>
            <div className="img-large-container hidden">
                <span className="fullscreen fa-stack fa-sm">
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className="fa fa-expand fa-stack-1x" />
                </span>
            </div>
        </div>
    )
}

function toggleMedia(id, src, filetype) {
    const imgWrap = $('#'+id);
    const thumbnail = imgWrap.find('.thumbnail');
    const expanded = imgWrap.find('.img-large-container');

    if (expanded.hasClass('hidden')) {
        // Current 

        if (filetype === ".webm") {
            // Create video
            var file = $('<video />', {
                src: src,
                type: 'video/mp4',
                controls: true,
                autoplay: true,
                loop: true,
                class: "expanded"
            });

        } else {
            // Create image
            var file = $('<img />', {
                src: src,   
                class: "expanded"
            })
        }

        // Hide the thumbnail and show the new element
        imgWrap.addClass('img-container-opened')
        expanded.removeClass('hidden')
                .append(file);
        thumbnail.addClass('hidden');

    } else {
        // Revert to thumbnail image
        imgWrap.removeClass('img-container-opened')
        expanded.addClass('hidden')
                .find('.expanded')
                    .remove()
        thumbnail.removeClass('hidden')
    }
}
