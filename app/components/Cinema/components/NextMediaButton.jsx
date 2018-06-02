import React from 'react';
import cx from 'classnames';
import {Icon} from '~/components/UI'

const i = Lurka.icons

const NextMediaButton = ({ className, ...restProps }) => {
    return (
        <div className={cx("next-media-button", className)} {...restProps}>
            <Icon name={i.cinemaNextMedia}/>
        </div>
    )
}

NextMediaButton.displayName = 'NextMediaButton';

export default NextMediaButton;
