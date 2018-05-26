import React from 'react';
import cx from 'classnames';

import './styles';
import { Card } from '~/components'

const SortByArea = ({ className, sortBy="bumporder", onSortByBumpOrder, onSortByLastReply, onSortByCreationDate, onSortByReplyCount }) => {
    return (
        <div className={cx('SortByArea', className)}>
            <Card size="medium" isActive={sortBy == "bumporder"} onClick={onSortByBumpOrder}>
                <span className="SortByArea__text">
                    Bump Order
                </span>
            </Card>
            <Card size="medium" isActive={sortBy == "lastreply"} onClick={onSortByLastReply}>
                <span className="SortByArea__text">
                    Last Reply
                </span>
            </Card>
            <Card size="medium" isActive={sortBy == "creationdate"} onClick={onSortByCreationDate}>
                <span className="SortByArea__text">
                    Creation Date
                </span>
            </Card>
            <Card size="medium" isActive={sortBy == "replycount"} onClick={onSortByReplyCount}>
                <span className="SortByArea__text">
                    Reply Count
                </span>
            </Card>
        </div>
    );
};

SortByArea.displayName = 'SortByArea';

export default SortByArea;
