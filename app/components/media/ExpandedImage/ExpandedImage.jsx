import React from 'react';
import cx from 'classnames';
import './ExpandedImage.styles';


const ExpandedImage = ({ className, srcThumbnail, srcExpanded, setReference, ...restProps }) => {
    const thumbnailStyles = {
        backgroundImage: `url(${srcThumbnail})`
    }

    return (
        <div className={cx('ExpandedImage', className)} ref={setReference} {...restProps}>
            <div className="ExpandedImage__blurred-thumbnail" style={thumbnailStyles}/>
            <img className="ExpandedImage__expanded" src={srcExpanded}/>
        </div>
    );
};

ExpandedImage.displayName = 'ExpandedImage';

export default ExpandedImage;
