import React from 'react';
import cx from 'classnames';
import './Button.styles';

const Button = ({ className, children, content, borderAccent, ...restProps }) => {
    return <button
        className={cx("Button", className, borderAccent && "border-accent")}
        {...restProps}>
        {children || content}
    </button>
};

Button.displayName = 'Button';

export default Button;
