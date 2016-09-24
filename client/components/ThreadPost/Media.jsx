import React from "react";

export function createMediaIfExists(ID, SRC, ext) {
    if (!ext) return;

    function bigMedia() {
        if (ext === ".webm") {
            return <video src={SRC.lg} type='video/mp4' loop controls autoPlay />
        } else {
            return <img src={SRC.lg} />
        }
    };

    return (
        <div id={ID} className='img-container' onClick={ event => toggleMedia(event, ID)}>
            <div className="thumbnail">
                <img src={SRC.sm} />
            </div>
            <div className="img-large-container hidden">
                <span className="fullscreen hidden fa-stack fa-sm">
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className="fa fa-expand fa-stack-1x" />
                </span>
                {bigMedia()}
            </div>
        </div>
    )
}

function toggleMedia(event, ID) {
    const imgWrap = $('#'+ID)
    const thumbnail = imgWrap.find('.thumbnail')
    const expanded = imgWrap.find('.img-large-container')

    if (expanded.hasClass('hidden')) {
        // expand image
        thumbnail.addClass('hidden')
        expanded.removeClass('hidden')
    } else {
        // revert to thumbnail image
        thumbnail.removeClass('hidden')
        expanded.addClass('hidden');
    }
}