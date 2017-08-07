import React, { PropTypes } from 'react';
import cx from 'classnames';
import './styles';

const ActionButton = ({ className, children, ...restProps }) => {
    return (
        <button className={cx('ActionButton', className)} {...restProps}>
            {children}
        </button>
    );
};

ActionButton.displayName = 'ActionButton';

ActionButton.propTypes = {
    className: PropTypes.string,
};

export default ActionButton;
