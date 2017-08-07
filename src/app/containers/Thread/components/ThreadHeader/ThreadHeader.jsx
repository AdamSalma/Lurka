import React, { PropTypes } from 'react';
import cx from 'classnames';
import {getShortTimeAgo} from '~/utils/time'

import {TimeAgoShort} from '~/components';
import { setHTML } from '~/utils/react';
import { isDefined } from '~/utils/types';
import './ThreadHeader.styles';

const Stat = ({ className, stat, children }) => {
    if (!isDefined(stat)) {
        return null
    }

    return (
        <div className={cx('ThreadStat', className)}>
            <div className="ThreadStat__stat">{stat}</div>
            <div className="ThreadStat__name">{children}</div>
        </div>
    );
};


const ThreadHeader = ({ className, OP, lastUpdated }) => {
    const { unique_ips, replies, images, tail_call, title, id } = OP
    const threadTitle = title ? title : `Thread #${id}`

    return (
        <div className={cx('ThreadHeader', className)} onClick={e => {e.stopPropagation()}}>
            { title && <div className="ThreadHeader__title" {...setHTML(title)}/>}
            <div className="ThreadHeader__stats">
                <Stat stat={unique_ips}>Unique IPs</Stat>
                <Stat stat={replies}>Replies</Stat>
                <Stat stat={images}>Images</Stat>
                <Stat stat={tail_call}>Tail Calls</Stat>

                {isDefined(lastUpdated) &&
                    <Stat className="last-updated" stat={ <TimeAgoShort time={lastUpdated}/> }>
                        Lastest Activity
                    </Stat>
                }
            </div>
        </div>
    );
};

ThreadHeader.displayName = 'ThreadHeader';

ThreadHeader.propTypes = {
    className: PropTypes.string,
};

export default ThreadHeader;



