import React from 'react';
import {Icon} from '~/components'

const i = window.appSettings.icons;

export default ({ onClick, paused, className, ariaLabelPlay, ariaLabelPause }) => {
    return (
        <div className="playpause">
            <button
                className="playpause-button"
                onClick={onClick}
                aria-label={ paused
                    ? ariaLabelPlay
                    : ariaLabelPause }
                type="button">
                { paused
                    ? <Icon name={i.videoPlay}/>
                    : <Icon name={i.videoPause}/>
                }
            </button>
        </div>
    );
};
