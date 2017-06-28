import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

// import './MediaViewer.styles';

// TODO: Create MediaViewer as a thread substitute for only watching media not reading comments.
// redux connector should use state.thread for nearly everything
class MediaViewer extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className, } = this.props;
        return (
            <div className={cx('MediaViewer', className)}>

            </div>
        );
    }
}

export default MediaViewer;
