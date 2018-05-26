import React from 'react';
import cx from 'classnames';
import './Button.styles';

const Button = ({ className, children, borderAccent, ...restProps }) => {
    return <button
        className={cx("Button", className, borderAccent && "border-accent")}
        {...restProps}>
        {children}
    </button>
};

Button.displayName = 'Button';

export default Button;
