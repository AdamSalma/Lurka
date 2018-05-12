import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
// import './BoardSearch.styles';

import { SearchBar } from '~/components';

class BoardSearch extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    render() {
        return (
            <SearchBar className="BoardSearch" />
        )
    }
}

export default BoardSearch;
