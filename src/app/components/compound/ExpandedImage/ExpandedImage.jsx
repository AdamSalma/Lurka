import React from 'react';
import cx from 'classnames';
import { Image } from '~/components';
import './ExpandedImage.styles';


const ExpandedImage = ({ className, srcThumbnail, srcExpanded, ...restProps }) => {

    const thumbnailStyles = {
        backgroundImage: `url(${srcThumbnail})`
    }

    console.error("ExpandedImage render")

    // Else is loading fullsize image
    return (
        <div className={cx('ExpandedImage', className)} {...restProps}>
            <div className="ExpandedImage__blurred-thumbnail" style={thumbnailStyles}/>
            <img className="ExpandedImage__expanded" src={srcExpanded}/>
        </div>
    );
};
            // <Image className="ExpandedImage__expanded" src={srcExpanded}/>

ExpandedImage.displayName = 'ExpandedImage';

export default ExpandedImage;
