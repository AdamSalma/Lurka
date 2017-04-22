import React from 'react'
import uuid from 'uuid'

import {
    Line,
    Icon,
    ToggleOnClick,
    Image,
    Video,
    DualMedia
} from '~/components'

import { setHTML, findParentWithClass } from '~/utils'

const i = window.appSettings.icons

export function renderControls(controls) {
    // TODO: Add functionality to thread icons
    // const { download, openReferences, ...} = controls
    return (
        <div className="thread-post-controls">
            <div className="controls-menu-toggle">
                <Icon name={i.threadPostMenu} />
            </div>
            <ul className="controls-menu">
                <li onClick={()=> console.log('Clicked on download icon')}>
                    <span><Icon name="download"/>
                        Download
                    </span>
                </li>
                <li>
                    <span><Icon name="reply"/>
                        Reply
                    </span>
                </li>
                <li>
                    <span><Icon name="comment-text"/>
                        Something else
                    </span>
                </li>
            </ul>
        </div>
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
        iconName = 'filmstrip'
    else
        // iconName = 'image-area'
        iconName = 'file-image'

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
        <DualMedia className="thread-media"
            thumbnail={<Image src={thumbnail}/>}>
            {createExpandedMedia(filetype, srcLarge)}
        </DualMedia>
    )
}

function createExpandedMedia(ext, src) {
    return ext === ".webm" ? (
        <Video loop autoPlay muted
            src={src}
            type="video/mp4"
            className="expanded"
        />
    ) : <Image className="expanded" key="expanded" src={src}/>
}
