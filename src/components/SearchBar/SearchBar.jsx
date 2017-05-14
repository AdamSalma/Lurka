import './Searchbar.styles'
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames'

import Icon from '../Icon'
import {bindMembersToClass} from '~/utils'

const i = window.appSettings.icons;

class Searchbar extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        showIcons: PropTypes.bool,
    };

    static defaultProps = {
        showIcons: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            'searchValue': ''
        }

        bindMembersToClass(this,
            'handleKeyPress',
            'clear',
            'setRef'
        )
    }

    focus() {
        this._searchInput && this._searchInput.focus()
    }

    clear() {
        this._searchInput.value = ''
        this.setState({
            'searchValue': ''
        })
    }

    handleKeyPress(e) {
        const searchValue = this._searchInput.value
        this.setState({ searchValue }, () => {
            if (this.props.onChange !== undefined) {
                this.props.onChange(searchValue)
            }
        })
    }

    setRef(c) {
        this._searchInput = c
    }

    render() {
        const {
            showIcons,
            className,
            ...restProps
        } = this.props;

        const searchbarClass = cx('Searchbar', className)

        return (
            <div className={searchbarClass}>
                {showIcons && <Icon
                    className="search"
                    name={i.searchMagnify} title="Search"
                    onClick={this.focus}
                />}
                <input
                    maxLength="100"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    {...restProps}
                    type="text"
                    ref={this.setRef}
                    onChange={this.handleKeyPress}
                />
                {showIcons && this.state.searchValue && <Icon
                    className="close"
                    name={i.searchClose} title="Clear search"
                    onClick={this.clear}
                />}
            </div>
        )
    }
}

export default Searchbar;
