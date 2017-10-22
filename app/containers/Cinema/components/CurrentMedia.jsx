import React from 'react';
import cx from 'classnames';
import * as components from '~/components'

const CurrentMedia = ({ srcLarge, thumbnail, className, filetype, onClick }) => {
    console.log("Hello")
    return (
        <div className={cx("current-media", className)} onClick={onClick}>
            {filetype === ".webm"
                ? <components.Video src={srcLarge} loop autoPlay muted type="video/mp4"/>
                : <components.ExpandedImage srcExpanded={srcLarge} srcThumbnail={thumbnail}/>
            }
        </div>
    )
}

CurrentMedia.displayName = 'CurrentMedia';

export default CurrentMedia;
