import React from 'react';
import Icon from '../Icon'

function formatVolumeIcon(muted, volume) {
    if (muted)
        return <Icon name="volume-off"/>
    if (volume <= 0)
        return <Icon name="volume-mute"/>
    if (volume < 3.3)
        return <Icon name="volume-low"/>
    if (volume < 6.6)
        return <Icon name="volume-medium"/>
    return <Icon name="volume-high"/>
}

export default ({ onChange, onClick, volume, muted, className, ariaLabelMute, ariaLabelUnmute }) => {
    const volumeValue = muted
        ? 0
        : +volume;
    const isSilent = muted || volume <= 0;
    return (
        <div className={className}>
            <button
                aria-label={isSilent
                    ? ariaLabelUnmute
                    : ariaLabelMute}
                className="volume-icon-wrap"
                onClick={onClick}
                type="button">
                { formatVolumeIcon(muted, volume) }
            </button>
            <div className="volume-slider">
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
