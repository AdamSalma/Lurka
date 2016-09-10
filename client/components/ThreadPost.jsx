import React from 'react';
import $ from 'jquery';

export default ({post}) => {
    const { id, title, date, imgsrc, comment, ext } = post

    const SRC = imgsrc
    const ID = 'thread-media-' + id

    return (
        <div className='thread-post'>
            <div className='post-info'>
                <span className={title ? 'subtitle-active' : ''}>{title}</span>
                <span className='dateTime'>{date}</span>
                <span className='postNum'>No.{id}</span>
                <span className='backlink'></span>
            </div>
            {createMediaIfExists()}
            <blockquote>
                <div className='postMessage' 
                     dangerouslySetInnerHTML={{__html: comment}}></div>
            </blockquote>
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
        <div>
            <img 
                className={'post-img'}
                id={ID}
                src={SRC.sm}
                onClick={toggleImage.bind(null, ID, SRC)}/>
        </div>
    )
}

function createWebm() {
    console.log('Webm creation attempted');
}

function toggleImage(ID, SRC) {
    const img = $(document.getElementById(ID))
    if (img.attr('src') === SRC.sm) {
        // blur image while large image is loading
        img
            .addClass('image-blur')
            .on({ 
                'load': () => img.removeClass('image-blur')
            })

        img.attr('src', SRC.lg);
    } else {
        img.attr('src', SRC.sm);
    }
}