import React, { Component } from 'react';
import cx from 'classnames';

const PostPositioner = ({ className, children, centered }) => {
    const classes = cx('PostPositioner', className, {
        "position-left": !centered,
        "position-centered": centered
    });

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

PostPositioner.defaultProps = {
    centered: true
};

export default PostPositioner
