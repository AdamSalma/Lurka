import React from 'react';
import { SearchBar, Icon } from '~/components';
import './BoardToolbarSearchBar.styles';

const BoardToolbarSearchBar = ({ onChange }) => (
    <div className="BoardToolbarSearchBar__wrapper">
        <Icon name="search-1" className="search"/>
        <SearchBar
            placeholder="Quick search"
            onChange={onChange}
            className="BoardToolbarSearchBar"
        />
        <Icon name="times" className="close"/>
    </div>
);

BoardToolbarSearchBar.displayName = 'BoardToolbarSearchBar';

export default BoardToolbarSearchBar;
