import React, { PropTypes } from 'react';
import cx from 'classnames';

import './SlideDownBG.styles';

const SlideDownBG = ({ className, children }) => {
    return (
        <div className={cx('SlideDownBG', className)}>
            {children}
        </div>
    );
};

SlideDownBG.displayName = 'SlideDownBG';

SlideDownBG.propTypes = {
    className: PropTypes.string,
};

export default SlideDownBG;
