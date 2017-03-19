import React from 'react';

const formatTime = (seconds) => {
    if (isNaN(seconds)) {
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60)
    seconds = Math.floor(seconds % minutes)

    return [minutes, seconds].join(':')
};

export default ({ currentTime, duration, className }) => {
    return (
        <div className={className}>
            <span className="time-current">
                { formatTime(currentTime) }
            </span>
            /
            <span className="time-duration">
                { formatTime(duration) }
            </span>
        </div>
    );
};
