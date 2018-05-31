import React, { PropTypes } from 'react';
import cx from 'classnames';
import config from 'config';

import './FullLogo.styles';
import {
    Logo,
    LogoText
} from '~/components';

const FullLogo = ({ className }) => {
    return (
        <div className={cx('FullLogo', className)}>
            <Logo className="logo"/>
            <div className="wrapper">
                <div className="text">
                    Lurka
                </div>
                <div className="version">
                    v{config.meta.version}
                </div>
            </div>
        </div>
    );
};

FullLogo.displayName = 'FullLogo';

FullLogo.propTypes = {
    className: PropTypes.string,
};

export default FullLogo;
