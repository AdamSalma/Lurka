import './LogoText.styles';
import React, { PropTypes } from 'react';
import cx from 'classnames';

import { name, version } from '-/package.json';

const LogoText = ({ className }) => {
    return <div className={cx('LogoText', className)}>
        <div className='center-content'>
            <div className='name'>{name}</div>
            <div className='version'>v{version}</div>
        </div>
    </div>
}

LogoText.displayName = 'LogoText';

LogoText.propTypes = {
    className: PropTypes.string,
};

export default LogoText
