import React, { PureComponent } from 'react';
import {
    Icon,
    VideoSpinner
} from '~/components/UI'

const i = Lurka.icons;

const OverlayIcon = ({ error, paused, loading }) => {
    if (!error && !loading || paused)
        return null

    return <span className="overlay-icon">
        { error ? <Icon name={i.videoError}/>
            : loading ? <VideoSpinner />
                : paused ? <Icon name={i.videoPlay}/>
                    : null
        }
    </span>
}

const VideoOverlay = ({ onClick, error, paused, loading }) => {
    return (
        <div className="video-overlay"
        onClick={onClick}>
            <OverlayIcon
                error={error}
                paused={paused}
                loading={loading}
            />
        </div>
    );
}

export default VideoOverlay
