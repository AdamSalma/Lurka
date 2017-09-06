import React from 'react';
import cx from 'classnames';
import * as components from '~/components'

const i = window.appSettings.icons

const NextMediaButton = ({ className, ...restProps }) => {
    return (
        <div className={cx("next-media-button", className)} {...restProps}>
            <components.Icon name={i.cinemaNextMedia}/>
        </div>
    )
}

NextMediaButton.displayName = 'NextMediaButton';

export default NextMediaButton;
