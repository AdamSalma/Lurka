import React from 'react';
import cx from 'classnames';
import {Icon} from '~/components/UI'

const i = Lurka.icons

const PreviousMediaButton = ({ className, ...restProps }) => {
    return (
        <div className={cx("previous-media-button", className)} {...restProps}>
            <Icon name={i.cinemaPreviousMedia}/>
        </div>
    )
}

PreviousMediaButton.displayName = 'PreviousMediaButton';

export default PreviousMediaButton;
