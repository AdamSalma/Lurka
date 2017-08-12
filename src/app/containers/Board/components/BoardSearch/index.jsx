import React from 'react';

import './styles';
import { SearchBarWithIcons } from '~/components';

const BoardSearch = ({ ...props }) => (
    <SearchBarWithIcons className="BoardSearch" {...props}/>
);

BoardSearch.displayName = 'BoardSearch';

export default BoardSearch;
