import React, { PropTypes } from 'react';
import cx from 'classnames'
import "./BoardToolbar.styles"

import {
    BoardToolbarSearchBar as SearchBar,
    TitledIcon as Icon,
    BoardToolbarMetadata as Metadata,
    ActionButton
} from '../../components'

const i = window.appSettings.icons;

const BoardToolbar = ({ className, children, posts, statistics, onSearch, onCreateThread, onViewArchive, onRefreshBoard, onSort, onFilter, onChangeLayout }) => {
    return (
        <div className={cx("BoardToolbar", className)}>
            <SearchBar onChange={onSearch}/>
            <div className="BoardToolbar__Footer">
                <Metadata className="BoardToolbar__Footer--left" posts={posts} statistics={statistics}/>
                <div className="BoardToolbar__Footer--right">
                    <Icon onClick={onSort} name={i.boardToolbarSort} title='Sort'/>
                    <Icon onClick={onFilter} name={i.boardToolbarFilter} title='Filter'/>
                </div>
            </div>
            <div className="BoardToolbar__ActionButtons">
                <ActionButton onClick={onCreateThread}>
                    <Icon name={i.navbarNewThread}/>
                    <div className="title">Create Thread</div>
                </ActionButton>
                <ActionButton onClick={onViewArchive}>
                    <Icon name={i.navbarArchive}/>
                    <div className="title">View Archive</div>
                </ActionButton>
                <ActionButton onClick={onRefreshBoard}>
                    <Icon name={i.navbarRefresh}/>
                    <div className="title">Refresh Board</div>
                </ActionButton>
            </div>
        </div>
    );
};

BoardToolbar.displayName = 'BoardToolbar';

BoardToolbar.propTypes = {
    className: PropTypes.string,
};

export default BoardToolbar;
