import React, { PureComponent } from 'react';
import cx from 'classnames'
import './styles'

import { Icon } from '~/components'
import { bindMembersToClass } from '~/utils/react'

const i = window.appSettings.icons;

class Searchbar extends PureComponent {
    setRef = (ref) => this._searchbar = ref

    render() {
        const {
            className,
            ...restProps
        } = this.props;

        const classNames = cx('Searchbar', className)

        return (
            <input className={classNames}
                maxLength="100"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                {...restProps}
                type="text"
                ref={this.setRef}
            />
        )
    }

    get value () {
        return this._searchbar.value
    }

    focus = () => {
        this._searchbar && this._searchbar.focus()
    }

    clear = () => {
        this._searchbar.value = ''
        this.setState({
            'searchValue': ''
        })
    }
}

export default Searchbar;
