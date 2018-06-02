import './styles';
import React from 'react';
import cx from 'classnames';
import { Button } from '~/components/UI';

const ButtonWithPopout = ({ className, popout, children, ...restProps }) => {
    return (
        <Button className={cx('ButtonWithPopout', className)} {...restProps}>
            <div className="popout">{popout}</div>
            <div className="content">{children}</div>
        </Button>
    );
};

ButtonWithPopout.displayName = 'ButtonWithPopout';

export default ButtonWithPopout;
