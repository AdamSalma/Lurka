import './Circle.styles'
import React, { PropTypes } from 'react';

const Circle = ({ className }) => {
    return (
        <div className={["Circle", className].join(' ')}/>
    );
};

Circle.displayName = 'Circle';

Circle.propTypes = {
    className: PropTypes.string,
};

export default Circle;
