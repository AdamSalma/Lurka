import React, { PureComponent } from 'react';
import cx from 'classnames';
import {SearchBar, Icon} from '~/components';
import './styles';
import {isDefined} from '~/utils/types';
import {invokeAfterUninterruptedDelay} from '~/utils/throttle'

const i = window.appSettings.icons;

class SearchBarWithIcons extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            searchValue: ''
        }

        this.handleSearch = invokeAfterUninterruptedDelay(100, this.handleSearch)
    }

    setRef = (ref) => this._searchbar = ref

    render() {
        const { className, ...restProps } = this.props;
        const { isFocused, searchValue } = this.state;

        const classNames = cx("SearchBarWithIcons", className, {
            "SearchBarWithIcons--is-focused": isFocused
        })

        return (
            <div className={classNames} onBlur={this.handleBlur}>
                <Icon name={i.searchMagnify} className="search-icon"/>
                <SearchBar
                    {...restProps}
                    ref={this.setRef}
                    onFocus={this.handleFocus}
                    onChange={this.handleSearch}
                />
                {searchValue &&
                    <Icon name={i.searchClose}
                        className="close-icon"
                        onClick={this.handleClear}
                    />
                }
            </div>
        );
    }

    handleSearch = () => {
        const searchValue = this._searchbar.value
        this.setState({ searchValue }, () => {
            if (isDefined(this.props.onChange)) {
                this.props.onChange(searchValue)
            }
        })
    }

    handleFocus = () => {
        console.log("handleFocus");
        this.setState({ isFocused:true });
    }

    handleBlur = () => {
        console.log("handleDefocus");
        this.setState({ isFocused:false });
    }

    focus = () => {
        this._searchbar.focus()
    }

    handleClear = () => {
        this.setState({searchValue: ""})
        if (isDefined(this.props.onChange))
            this.props.onChange("");
        // interact with the dom after changes are set
        this.clear();
    }

    clear = () => {
        this._searchbar.clear()
    }

}

export default SearchBarWithIcons;
