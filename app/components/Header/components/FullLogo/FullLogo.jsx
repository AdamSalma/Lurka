import React, { PropTypes } from 'react';
import cx from 'classnames';
import config from 'config';

import './FullLogo.styles';
import {
    Logo,
    LogoText
} from '~/components/UI';

const FullLogo = ({ className }) => {
    return (
        <div className={cx('FullLogo', className)}>
            <Logo className="FullLogo__Logo"/>
            <div className="FullLogo__LogoText">
                Lurka
            </div>
            <div className="FullLogo__LogoVersion">
                v{config.meta.version}
            </div>
        </div>
    );
};

FullLogo.displayName = 'FullLogo';

FullLogo.propTypes = {
    className: PropTypes.string,
};

export default FullLogo;
