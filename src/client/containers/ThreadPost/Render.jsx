import React from 'react'
import uuid from 'uuid'

import { 
    Line, 
    Icon,
    ToggleOnClick, 
    Image,
    Video
} from '~/components'

import { setHTML } from '~/utils'


export function renderControls(controls) {
    // TODO: Add functionality to thread icons
    // const { download, openReferences, ...} = controls 
    return (
        <ul className="controls">
            <li onClick={()=> console.log('Clicked on download icon')}>
                <span className='mdi mdi-download'></span>
            </li>
            <li>
                <span className='mdi mdi-reply'></span>
            </li>
            <li>
                <span className='mdi mdi-comment-text'></span>
            </li>
        </ul>
    )
}

export function renderRefs(refs) {
    return refs && refs.length ? <div className='references'>
        <Line/>
        <span className="reference-header">
            <span className="reply-count">({refs.length}) </span>
            <Icon name="account-multiple"/> 
        </span>
        {refs.map( ref => 
            <span key={uuid.v4()} className="quote">
                <a className="quotelink" href={`#p${ref}`}>
                    {`>>${ref}`}
                </a>
            </span>
        )}
    </div> : ''
}

export function renderTitle(title) {
    if (title) return <span className='title'> 
        <strong {...setHTML(title)}/>
        <span className='pipe'/>
    </span>
}

export function renderMediaInfo(media) {
    if (!media) return

    const { filename, filetype } = media

    let iconName;
    if (filetype.includes("webm"))
        iconName = 'video'
    else
        iconName = 'image-area'

    let fName = filename
    if (fName.length > 25)
        fName = fName.slice(0, 25) + '(...)'
    fName += filetype

    return (
        <div className="media-info">
            <Icon name={iconName}/>
            <span className="filename" {...setHTML(fName)}/>
        </div>
    )

}

export function renderMedia(media) {
    if (!media) 
        return

    const { thumbnail, srcLarge, filetype, height, width } = media

    // TODO: Lazy load thread thumbnails
    return (
        <ToggleOnClick 
            className="thread-media"
            from={<Image src={thumbnail}/>}
            to={createExpandedMedia(filetype, srcLarge)}
        />
    )
}

function createExpandedMedia(ext, src) {
    return ext === ".webm" ? (
        <Video controls autoplay loop 
            src={src} 
            type="video/mp4"
            className="expanded"
            key="expanded"
        />
    ) : <Image className="expanded" key="expanded" src={src}/>
}
