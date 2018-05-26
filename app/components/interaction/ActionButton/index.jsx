import React, { PropTypes } from 'react';
import cx from 'classnames';
import './styles';
import { Button } from '~/components';

const ActionButton = ({ className, children, ...restProps }) => {
    return (
        <Button className={cx('ActionButton', className)} {...restProps}>
            {children}
        </Button>
    );
};

ActionButton.displayName = 'ActionButton';

export default ActionButton;
