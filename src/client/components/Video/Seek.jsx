import React from 'react';

export default ({ onChange, percentagePlayed, percentageBuffered, className, ariaLabel }) => {
    return (
        <div className="seek">
            <div className="seek-track">
                <div
                    className="seek-buffer"
                    style={{
                        width: `${percentageBuffered || 0}%`
                    }} />
                <div
                    className="seek-fill"
                    style={{
                        width: `${percentagePlayed || 0}%`
                    }} />
                <input
                    min="0"
                    step={1}
                    max="100"
                    type="range"
                    orient="horizontal"
                    onChange={onChange}
                    aria-label={ariaLabel}
                    className="seek-input"
                    value={percentagePlayed} />
            </div>
        </div>
    );
};
