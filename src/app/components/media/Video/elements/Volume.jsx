import React from 'react';
import {Icon} from '~/components';

const i = Lurka.icons;

function hasAudio (video={}) {
    return video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length);
}

function formatVolumeIcon(muted, volume) {
    console.info(muted, volume)
    if (muted)
        return <Icon name={i.videoVolumeOff}/>
    if (volume <= 0)
        return <Icon name={i.videoVolumeMute}/>
    if (volume < 0.3)
        return <Icon name={i.videoVolumeLow}/>
    if (volume < 0.6)
        return <Icon name={i.videoVolumeMedium}/>
    return <Icon name={i.videoVolumeHigh}/>
}

export default ({ onChange, onClick, getVideoEl, volume, muted, className, ariaLabelMute, ariaLabelUnmute }) => {
    const volumeValue = muted
        ? 0
        : +volume;
    const isSilent = muted || volume <= 0;

    return (
        <div className="volume">
            <button
                aria-label={isSilent
                    ? ariaLabelUnmute
                    : ariaLabelMute}
                className="volume-button"
                onClick={onClick}
                type="button">
                { formatVolumeIcon(muted, volume) }
            </button>
            <div className="volume-slider" onClick={e => e.stopPropagation()}>
                <div className="volume-track">
                    <div
                        className="volume-fill"
                        style={{
                            height: `${volumeValue * 100}%`
                        }} />
                    <input
                        min="0"
                        step={0.1}
                        max="1"
                        type="range"
                        orient="vertical"
                        onChange={onChange}
                        className="volume-bar"
                        value={volumeValue} />
                </div>
            </div>
        </div>
    );
};
