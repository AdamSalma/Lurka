import React from 'react'
import Icon from '../Icon'

export default ({ onClick, className, ariaLabel }) => {
    return (
        <div className="fullscreen">
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className="fullscreen-button">
                    <Icon name="fullscreen" />
            </button>
        </div>
    );
};
