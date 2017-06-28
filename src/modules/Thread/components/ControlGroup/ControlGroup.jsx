import React, { PropTypes } from 'react';
import cx from 'classnames';

import './ControlGroup.styles';

const ControlGroup = ({ className, position, children }) => {
    const controllerClass = cx('ControlGroup', className, {
        'ControlGroup--top-right': position === 'topright',
        'ControlGroup--top-left': position === 'topleft',
        'ControlGroup--bottom-left': position === 'bottomleft',
        'ControlGroup--bottom-right': position === 'bottomright',
    });

    return (
        <div className={controllerClass}>
            {children}
        </div>
    );
};

ControlGroup.displayName = 'ControlGroup';

ControlGroup.propTypes = {
    className: PropTypes.string,
};

export default ControlGroup;
