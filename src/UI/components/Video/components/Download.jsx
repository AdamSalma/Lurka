import React from 'react'
import {Icon} from '~/components'

const i = window.appSettings.icons;

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
