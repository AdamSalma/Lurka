import React, { PropTypes } from 'react';
import cx from 'classnames';

import './PostID.styles';
import {Tooltip} from '~/components';

const PostID = ({ id, tooltip, tooltipPosition="top", className, onClick }) => {
    return (
        <Tooltip
            className={cx('PostID', className)}
            onClick={onClick}
            content={tooltip}
            position={tooltipPosition}>
            <span className='id'>#{id}</span>
        </Tooltip>
    );
};

PostID.displayName = 'PostID';

PostID.propTypes = {
    className: PropTypes.string,
};

export default PostID;
