import React, { PropTypes } from 'react';
import cx from 'classnames';

import './FullLogo.styles';
import {
    Logo,
    LogoText
} from '~/components';

const FullLogo = ({ className }) => {
    return (
        <div className={cx('FullLogo', className)}>
            <Logo className="FullLogo__Logo"/>
            <LogoText className="FullLogo__LogoText"/>
        </div>
    );
};

FullLogo.displayName = 'FullLogo';

FullLogo.propTypes = {
    className: PropTypes.string,
};

export default FullLogo;
