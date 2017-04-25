import './Circle.styles'
import React, { PropTypes } from 'react';

const Circle = ({ className, children }) => {
    return (
        <div className={["Circle", className].join(' ')}>
            {children}
        </div>
    );
};

Circle.displayName = 'Circle';

Circle.propTypes = {
    className: PropTypes.string,
};

export default Circle;
