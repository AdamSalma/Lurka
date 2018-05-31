import React from 'react';
import cx from 'classnames';

const BoardListItem = (props) => {
    const { boardID, title, info, isFavourite } = props.board;

    return (
        <div className={cx('BoardListItem', isFavourite && "is-favourite")} onClick={props.onClick}>
            <div className="title-wrap">
                <div className="title">{title}</div>
                <div className="id">{boardID}</div>
            </div>
            <div className="stickies">
                {}
            </div>
        </div>
    );
};

BoardListItem.displayName = 'BoardListItem';

export default BoardListItem;
