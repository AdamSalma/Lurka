import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import { Card } from '~/components'

class SortByArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: props.sortBy || "bumporder",
            isSorting: false
        }
    }

    render() {
        const { className, onSortByBumpOrder, onSortByLastReply, onSortByCreationDate, onSortByReplyCount, Spinner } = this.props;

        const { sortBy, isSorting } = this.state;

        return (
            <div className={cx('SortByArea', className)}>
                {isSorting && Spinner || [
                    <Card size="medium" isActive={sortBy == "bumporder"} onClick={this.onSortByBumpOrder}>
                        <span className="SortByArea__text">
                            Bump Order
                        </span>
                    </Card>,
                    <Card size="medium" isActive={sortBy == "lastreply"} onClick={this.onSortByLastReply}>
                        <span className="SortByArea__text">
                            Last Reply
                        </span>
                    </Card>,
                    <Card size="medium" isActive={sortBy == "creationdate"} onClick={this.onSortByCreationDate}>
                        <span className="SortByArea__text">
                            Creation Date
                        </span>
                    </Card>,
                    <Card size="medium" isActive={sortBy == "replycount"} onClick={this.onSortByReplyCount}>
                        <span className="SortByArea__text">
                            Reply Count
                        </span>
                    </Card>
                ]}
            </div>
        );
    }

    onChange = (sortBy, callback) => {
        this.setState({
            sortBy,
            isSorting: true
        }, () => setTimeout(this.props[callback], 30))
    }

    onSortByBumpOrder = () => {
        this.onChange("bumporder", "onSortByBumpOrder")
    }

    onSortByLastReply = () => {
        this.onChange("lastreply", "onSortByLastReply")
    }

    onSortByCreationDate = () => {
        this.onChange("creationdate", "onSortByCreationDate")
    }

    onSortByReplyCount = () => {
        this.onChange("replycount", "onSortByReplyCount")
    }
}

SortByArea.displayName = 'SortByArea';

export default SortByArea;
