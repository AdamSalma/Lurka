import React from 'react';
import { SearchBar } from '~/components';
import './BoardToolbarSearchBar.styles';

const BoardToolbarSearchBar = ({ onChange }) => (
    <SearchBar
        placeholder="Quick search"
        onChange={onChange}
        className="BoardToolbarSearchBar"/>
);

BoardToolbarSearchBar.displayName = 'BoardToolbarSearchBar';

export default BoardToolbarSearchBar;
