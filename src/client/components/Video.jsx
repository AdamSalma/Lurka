import React from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

/**
 * Wrapper to avoid messy imports.
 */
export default ({controls, poster, onCanPlayThrough, children, ...restProps}) => {
    return (
        <Video {...restProps}
            controls={controls}
            poster={poster}
            onCanPlayThrough={onCanPlayThrough}>
            {children}
        </Video>
    );
}
