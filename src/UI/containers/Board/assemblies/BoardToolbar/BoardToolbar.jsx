import React, { PropTypes } from 'react';
import cx from 'classnames'
import "./BoardToolbar.styles"

import {Button} from '~/components'
import {
    BoardToolbarSearchBar as SearchBar,
    TitledIcon as Icon,
    BoardToolbarMetadata as Metadata
} from '../../components'

const i = window.appSettings.icons;

const BoardToolbar = ({ className, children, posts, statistics, onSearch, onCreateThread, onViewArchive, onRefreshBoard, onSort, onFilter, onChangeLayout }) => {
    return (
        <div className={cx("BoardToolbar", className)}>
            <SearchBar onChange={onSearch} onClick={() => alert('nigger')} showIcons/>
            <div className="BoardToolbar__Footer">
                <Metadata className="BoardToolbar__Footer--left" posts={posts} statistics={statistics}/>
                <div className="BoardToolbar__Footer--right">
                    <Icon onClick={onSort} name={i.boardToolbarSort} title='Sort'/>
                    <Icon onClick={onFilter} name={i.boardToolbarFilter} title='Filter'/>
                    <Icon onClick={onChangeLayout} name={i.boardToolbarLayout} title="Layout"/>
                </div>
            </div>
            <div className="BoardToolbar__ActionButtons">
                <Button onClick={onCreateThread}>Create Thread</Button>
                <Button onClick={onViewArchive}>View Archive</Button>
                <Button onClick={onRefreshBoard}>Refresh Board</Button>
            </div>
        </div>
    );
};

BoardToolbar.displayName = 'BoardToolbar';

BoardToolbar.propTypes = {
    className: PropTypes.string,
};

export default BoardToolbar;
