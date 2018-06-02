import Video from './Video';
import videoConnect from 'react-html5video';
import screenfull from 'screenfull';

import aria from './aria-label';
import * as api from './api';

export default videoConnect(
    Video,
    ({ networkState, readyState, error, ...restState }) => ({
        aria,
        video: {
            readyState,
            networkState,
            error: error || networkState === 3,
            loading: readyState < 4,
            percentagePlayed: api.getPercentagePlayed(restState),
            percentageBuffered: api.getPercentageBuffered(restState),
            ...restState
        }
    }),
    (videoEl, state) => ({
        onFullscreenClick: () => {
            console.log(videoEl)
            if (screenfull.enabled) {
                screenfull.toggle(videoEl.parentElement);
                $(videoEl.parentElement).toggleClass('is-fullscreen')
            }
        },
        onVolumeClick: () => {
            api.toggleMute(videoEl, state)
        },
        onPlayPauseClick: () => {
            api.togglePause(videoEl, state)
        },
        onVolumeChange: (e) => {
            api.setVolume(videoEl, state, e.target.value)
        },
        onSeekChange: (e) => {
            api.setCurrentTime(videoEl, state, e.target.value * state.duration / 100);
        }
    })
);
