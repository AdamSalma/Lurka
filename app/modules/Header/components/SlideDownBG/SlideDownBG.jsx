import React, { PropTypes } from 'react';
import cx from 'classnames';

import './SlideDownBG.styles';

const SlideDownBG = ({ className, children, ...restProps }) => {
    return (
        <div className={cx('SlideDownBG', className)} {...restProps}>
            <div className="SlideDownBG__slidee">
                {children}
            </div>
        </div>
    );
};

SlideDownBG.displayName = 'SlideDownBG';

SlideDownBG.propTypes = {
    className: PropTypes.string,
};

export default SlideDownBG;
