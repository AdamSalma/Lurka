import React from 'react'
import {Icon} from '~/components/UI'

const i = Lurka.icons;

export default ({ onClick, className, ariaLabel }) => {
    return (
        <div className="fullscreen">
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className="fullscreen-button">
                    <Icon name={i.videoFullscreen} />
            </button>
        </div>
    );
};
