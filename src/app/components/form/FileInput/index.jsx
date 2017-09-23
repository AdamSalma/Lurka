import React from 'react';
import cx from 'classnames';
import './styles';

const FileInput = ({ className, ...restProps }) => {
    const uid = "id"+Date.now();

    return (
        <div className={cx("FileInput", className)}>
            <input {...restProps} id={uid} type="file"/>
            <label for={uid}>Choose a file</label>
        </div>
    );
};

FileInput.displayName = 'FileInput';

export default FileInput;
