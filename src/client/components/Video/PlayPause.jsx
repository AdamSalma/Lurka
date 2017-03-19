import React from 'react';
import Icon from '../Icon'

export default ({ onClick, paused, className, ariaLabelPlay, ariaLabelPause }) => {
    return (
        <div className={className}>
            <button
                className="playpause-wrap"
                onClick={onClick}
                aria-label={ paused
                    ? ariaLabelPlay
                    : ariaLabelPause }
                type="button">
                { paused
                    ? <Icon name="play"/>
                    : <Icon name="pause"/>
                }
            </button>
        </div>
    );
};
