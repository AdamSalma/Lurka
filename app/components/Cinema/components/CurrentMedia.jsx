import React from 'react';
import cx from 'classnames';
import { Video, ExpandedImage } from '~/components/UI'

const CurrentMedia = ({ srcLarge, thumbnail, className, filetype, onClick }) => {
    console.log("Hello")
    return (
        <div className={cx("current-media", className)} onClick={onClick}>
            {filetype === ".webm"
                ? <Video src={srcLarge} loop autoPlay muted type="video/mp4"/>
                : <ExpandedImage srcExpanded={srcLarge} srcThumbnail={thumbnail}/>
            }
        </div>
    )
}

CurrentMedia.displayName = 'CurrentMedia';

export default CurrentMedia;
