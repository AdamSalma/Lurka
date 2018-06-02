import React from 'react'
import {Icon} from '~/components/UI'

const i = Lurka.icons;

export default ({ onClick, className, ariaLabel, downloadName, downloadLink }) => {
    return (
        <a className="download" href={downloadLink} download onClick={e => {e.stopPropagation(); console.log("click");}}>
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className="download-button">
                    <Icon name={i.videoDownload} />
            </button>
        </a>
    );
};
