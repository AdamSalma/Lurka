import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import { Icon } from '~/components';
import { isFunction } from '~/utils/types'

const i = Lurka.icons;

class styles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: null
        }
    }

    handleChange = (e) => {
        const fileName = e.target.value.split(/(\\|\/)/g).pop()

        this.setState({ fileName }, () => {
            isFunction(this.props.onChange) && this.props.onChange(e, fileName)
        })
    }

    render() {
        const { className, ...restProps } = this.props;
        const { fileName } = this.state;
        const uid = "id"+Date.now();

        return (
            <div className={cx("FileInput", className)}>
                <input {...restProps} id={uid} type="file" onChange={this.handleChange}/>
                <label htmlFor={uid}>
                    <Icon name={i.fileInput}/>
                    {fileName &&
                        <div className="FileInput__filename">
                            {fileName}
                        </div>
                    }
                </label>
            </div>
        );
    }
}

export default styles;
