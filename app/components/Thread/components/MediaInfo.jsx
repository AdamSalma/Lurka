import React from 'react'
import { Icon } from '~/components/UI'
import { setHTML } from '~/utils/react'

const MediaInfo = ({ media }) => {
    if (!media)
        return null

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
            <span className="filename" {...setHTML(fName)} title={filename}/>
        </div>
    )

}

MediaInfo.displayName = 'MediaInfo';

export default MediaInfo;
