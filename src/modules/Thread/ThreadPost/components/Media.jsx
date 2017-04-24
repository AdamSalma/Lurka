import React from 'react'
import {
    Image,
    Video,
    DualMedia
} from '~/components'

const Media = ({ media }) => {
    if (!media)
        return null

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

Media.displayName = 'Media';

export default Media;
