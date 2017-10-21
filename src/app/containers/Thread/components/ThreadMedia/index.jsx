import './styles'
import React from 'react'

import {
    Icon,
    Image,
    ImageWithChild,
    Video,
    DualMedia,
    ButtonCircle,
    ThreadImageContextMenu as ContextMenu
} from '~/components'

import ThreadImage from '../ThreadImage';

import { emitContextMenuOpen } from '~/events'

const i = Lurka.icons;


const Media = ({ media, onMediaToggle }) => {
    if (!media)
        return null

    const { thumbnail, srcLarge, filetype, height, width } = media

    return (
        <DualMedia
            className="ThreadMedia"
            onClick={onMediaToggle}
            onContextMenu={event => emitContextMenuOpen({
                event, ContextMenu: <ContextMenu media={media}/>
            })}
            thumbnail={<Image src={thumbnail}/>}>
            {
                filetype === ".webm"
                    ? <Video loop autoPlay muted
                        src={srcLarge}
                        type="video/mp4"
                        className="ThreadMedia--expanded"
                      />
                    : (
                        <ThreadImage
                          width={width}
                          height={height}
                          src={srcLarge}
                          thumbnail={thumbnail}
                        />
                    )
            }
        </DualMedia>
    )
}

Media.displayName = 'Media';

export default Media;

