import React, { Component } from 'react';
import cx from 'classnames';

const PostPositioner = ({ className, children, centered, onClick }) => {
    const classes = cx('PostPositioner', className, {
        "position-left": !centered,
        "position-centered": centered
    });

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

PostPositioner.defaultProps = {
    centered: true
};

export default PostPositioner
