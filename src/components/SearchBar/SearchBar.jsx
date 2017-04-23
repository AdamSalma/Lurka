import './Searchbar.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

import Icon from '../Icon'
import {bindMembersToClass} from '~/utils'

class Searchbar extends Component {
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
                    name="ios-search-strong" title="Search"
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
                    name="close" title="Clear search"
                    onClick={this.clear}
                />}
            </div>
        )
    }
}

export default Searchbar;
