import React, { PropTypes } from 'react';
import {Image} from '~/components/UI';

const BoardPostImage = ({ src, height, onLoad}) => {
    return !isNaN(height) ? (
        <div className="image-wrap">
            <Image
                src={src}
                style={{height}}
                onLoad={onLoad}
            />
        </div>
    ) : false
};


BoardPostImage.displayName = 'BoardPostImage';

BoardPostImage.propTypes = {
    className: PropTypes.string,
};

export default BoardPostImage;
