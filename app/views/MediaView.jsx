import React, { PropTypes } from 'react';
import cx from 'classnames'

import MediaViewer from '~/containers/MediaViewer';

const MediaView = ({ className }) => {
    return (
        <section className={cx('View MediaView', className)}>
            <MediaViewer/>
        </section>
    );
};

MediaView.displayName = 'MediaView';

MediaView.propTypes = {
    className: PropTypes.string,
};

export default MediaView;
