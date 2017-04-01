import React, { PropTypes } from 'react';
import videoConnect from 'react-html5video';

import aria from './aria-label';
import {
    setVolume,
    showTrack,
    toggleTracks,
    toggleMute,
    togglePause,
    setCurrentTime,
    toggleFullscreen,
    getPercentagePlayed,
    getPercentageBuffered
} from './api';
import Time from './Time';
import Seek from './Seek';
import Volume from './Volume';
import PlayPause from './PlayPause';
import Fullscreen from './Fullscreen';
import Overlay from './Overlay';

export const Video = ({
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
    ...restProps
}) => {
    return (
        <div className={[
            "video-wrapper", 
            className
        ].join(' ')}>
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
    aria,
    video: {}
};

Video.propTypes = {
    aria: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired
};

export default videoConnect(
    Video,
    ({ networkState, readyState, error, ...restState }) => ({
        video: {
            readyState,
            networkState,
            error: error || networkState === 3,
            loading: readyState < 4,
            percentagePlayed: getPercentagePlayed(restState),
            percentageBuffered: getPercentageBuffered(restState),
            ...restState
        }
    }),
    (videoEl, state) => ({
        onFullscreenClick: (e) => {e.stopPropagation(); toggleFullscreen(videoEl.parentElement)},
        onVolumeClick: (e) => {e.stopPropagation(); toggleMute(videoEl, state)},
        onPlayPauseClick: (e) => {e.stopPropagation(); togglePause(videoEl, state)},
        onVolumeChange: (e) => {e.stopPropagation(); setVolume(videoEl, state, e.target.value)},
        onSeekChange: (e) => {e.stopPropagation(); setCurrentTime(videoEl, state, e.target.value * state.duration / 100)},
        getVideoEl: () => videoEl
    })
);
