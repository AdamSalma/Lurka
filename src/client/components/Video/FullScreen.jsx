import React from 'react'
import Icon from '../Icon'

export default ({ onClick, className, ariaLabel }) => {
    return (
        <div className={className}>
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className="fullscreen-wrap">
                    <Icon name="fullscreen" />
            </button>
        </div>
    );
};
