import React from 'react';

// http://stackoverflow.com/a/37770048
const formatTime = (seconds) => {
    if (isNaN(seconds))
        return "0:00"

    let s = Math.floor(seconds)
    return (s-(s%=60)) / 60 + (
        9 < s ? ':': ':0'
    ) + s
};

export default ({ currentTime, duration, className }) => {
    return (
        <div className="time">
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
