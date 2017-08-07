import React from 'react';
import cx from 'classnames';
import './Button.styles';

const Button = ({ className, children, ...restProps }) => {
    return <button className={cx("Button", className)} {...restProps}>
        {children}
    </button>
};

Button.displayName = 'Button';

export default Button;
