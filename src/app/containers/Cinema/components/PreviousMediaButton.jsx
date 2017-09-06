import React from 'react';
import cx from 'classnames';
import * as components from '~/components'

const i = window.appSettings.icons

const PreviousMediaButton = ({ className, ...restProps }) => {
    return (
        <div className={cx("previous-media-button", className)} {...restProps}>
            <components.Icon name={i.cinemaPreviousMedia}/>
        </div>
    )
}

PreviousMediaButton.displayName = 'PreviousMediaButton';

export default PreviousMediaButton;
