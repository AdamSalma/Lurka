import React from 'react';
import './styles';

import { SearchBarWithIcons } from '~/components';

const BoardSearch = ({ ...props }) => (
    <SearchBarWithIcons {...props} className="BoardSearch" />
);

BoardSearch.displayName = 'BoardSearch';

export default BoardSearch;
