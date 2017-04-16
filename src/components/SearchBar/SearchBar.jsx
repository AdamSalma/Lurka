import './SearchBar.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames'
import Icon from '../Icon'

class SearchBar extends Component {
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
    }

    focus() {
        this._searchbar.focus()
    }

    clear() {
        this._searchbar.value = ''
        this.setState({
            'searchValue': ''
        })
    }

    handleKeyPress(e) {
        const { searchValue } = this.state
        this.setState({ searchValue: this.refs.searchInput.value }, () => {
            if (this.props.onKeyPress !== undefined) {
                this.props.onKeyPress(searchValue)
            }
        })
    }

    render() {
        const {
            showIcons, 
            className, 
            ...restProps
        } = this.props;

        return (
            <div className={cx('SeachBar', className)}>
                {showIcons && <Icon 
                    name="search" title="Search"
                    onClick={this.focus}
                />}
                <input 
                    type="text"
                    ref={el => this._searchbar = el} 
                    onKeyPress={this.handleKeyPress}
                    maxLength="100"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    {...restProps}
                />
                {showIcons && <Icon 
                    name="close" title="Clear search" 
                    onClick={this.clear}
                />}
            </div>
        )
    }
}

export default SearchBar;
