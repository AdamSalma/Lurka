import React from 'react';
import cx from 'classnames';

import './NoSearchResults.styles';

const NoSearchResults = ({ className, children }) => {
    return (
        <div className={cx('NoSearchResults', className)}>
            {children}
        </div>
    );
};

NoSearchResults.displayName = 'NoSearchResults';

NoSearchResults.propTypes = {
    className: PropTypes.string,
};

export default NoSearchResults;
