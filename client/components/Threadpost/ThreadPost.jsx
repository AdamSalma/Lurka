import React from 'react';
import $ from 'jquery';

export default ({post, children}) => {
    const { id, title, date, imgsrc, comment, ext } = post

    const SRC = imgsrc
    const ID = 'thread-media-' + id

    return (
        <div className='thread-post'>
            <div className='info'>
                {() => {if (title) return <span className='title'>{title}</span>}}
                {children}
                <span className='number'>No.{id}</span>
                <span className='backlink'></span>
            </div>
            {createMediaIfExists()}
            <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
        </div>
    )

    function createMediaIfExists() {
        if (SRC) {
            if (ext === '.webm') return createWebm();
            else return createImage(ID, SRC);
        }
    }
}


function createImage(ID, SRC) {
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

function createWebm() {
    console.log('Webm creation attempted');
}

function toggleImage(ID, SRC) {
    const img = $('#'+ID)
    const fullscreen = img.prev()

    if (img.attr('src') === SRC.sm) {
        // blur image while large image is loading
        img.addClass('image-loading')
           .on('load', function(){
               img.removeClass('image-loading')
                  .off('load');
               fullscreen.removeClass('hidden');
           })

        img.attr('src', SRC.lg);
    } else {
        img.attr('src', SRC.sm)
        fullscreen.addClass('hidden')
    }
}