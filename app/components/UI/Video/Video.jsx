import React, { PropTypes } from 'react';

import {
    Time,
    Seek,
    Volume,
    PlayPause,
    Fullscreen,
    Overlay,
    Download
} from './elements';

import './Video.styles'

const Video = (props) => {
    const {
        aria,
        video,
        children,
        className,
        onSeekChange,
        onVolumeChange,
        onVolumeClick,
        onPlayPauseClick,
        onFullscreenClick,
        getVideoEl,

        vidSrc,
        ...restProps
    } = props;

    return (
        <div className={[
            "video-wrapper",
            className
        ].join(' ')} onClick={e => e.stopPropagation()}>
            <video
                className="video"
                {...restProps}>
                { children }
            </video>
            <Overlay
                onClick={onPlayPauseClick}
                {...video} />
            { !video.error ?
                <div className="video-controls">
                    <PlayPause
                        ariaLabelPlay={aria.play}
                        ariaLabelPause={aria.pause}
                        onClick={onPlayPauseClick}
                        {...video} />
                    <Time
                        {...video} />
                    <Seek
                        ariaLabel={aria.seek}
                        onChange={onSeekChange}
                        {...video} />
                    <Volume
                        onClick={onVolumeClick}
                        onChange={onVolumeChange}
                        getVideoEl={getVideoEl}
                        ariaLabelMute={aria.mute}
                        ariaLabelUnmute={aria.unmute}
                        {...video} />
                    <Download downloadLink={vidSrc} {...video}/>
                    <Fullscreen
                        ariaLabel={aria.fullscreen}
                        onClick={onFullscreenClick}
                        {...video} />
                </div>
            : null }
        </div>
    );
};

Video.defaultProps = {
    video: {}
};

export default Video
