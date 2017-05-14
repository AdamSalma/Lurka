import React, { PureComponent } from 'react';
import Icon from '../Icon'
import Spinner from '../Spinner'

const i = window.appSettings.icons;

const OverlayIcon = ({ error, paused, loading }) => {
    if (!error && !loading && !paused)
        return null

    return <span className="overlay-icon">
        { error ? <Icon name={i.videoError}/>
            : loading ? <Spinner />
                : paused ? <Icon name={i.videoPlay}/>
                    : null
        }
    </span>
}

const VideoOverlay = () => {
    const { onClick, error, paused, loading } = this.props;
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
