import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Image } from '~/components';

const ImageWithChild = ({ className, children, ...restProps }) => {
    return (
        <div className={cx("ImageWithChild", className)} style={{position: 'relative'}}>
            <Image {...restProps}/>
            {children}
        </div>
    );
};

ImageWithChild.displayName = 'ImageWithChild';

ImageWithChild.propTypes = {
    className: PropTypes.string,
};

export default ImageWithChild;


// TODO IDEA: Make thread watcher panel have a plus button that you can add the current thread with or add multiple boards (depending on location). MUST DO!!!
// TODO IDEA: Instead of fullscreening image, make a mediaReel
