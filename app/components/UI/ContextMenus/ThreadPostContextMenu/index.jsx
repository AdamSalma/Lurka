import React, { Component } from 'react';
import cx from 'classnames';

import { Icon, CopyToClipboard } from "~/components/UI";
import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuHeader,
    ContextMenuSeperator,
} from '../ContextMenu'

import { emitContextMenuClose, emitPostToggle } from '~/events';

const i = Lurka.icons;

class ThreadPostContextMenu extends Component {
    constructor(props) {
        super(props);
    }

    closeMenu(e) {
        e.stopPropagation();
        emitContextMenuClose();
    }

    render() {
        const { className, post } = this.props;
        // const {id, name, title, date, media, comment, references, time} = post;

        return (
            <ContextMenu className={cx('ThreadPostContextMenu', className)} onClick={this.closeMenu}>
                {!!window.getSelection().toString() &&
                    <ContextMenuItem>
                        <CopyToClipboard><span>Copy</span></CopyToClipboard>
                    </ContextMenuItem>
                }
                <ContextMenuItem onClick={this.onReply}>
                    <Icon name={i.threadContextMenuReply}/>
                    <span>Reply</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Icon name={i.threadContextMenuBookmark}/>
                    <span>Bookmark post</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Icon name={i.threadContextMenuFlag}/>
                    <span>Report post</span>
                </ContextMenuItem>
            </ContextMenu>
        );
    }

    onReply = (e) => {
        emitPostToggle({
            context: "thread",
            override: true,
            quoteUser: this.props.post.id
        })
    }
}

export default ThreadPostContextMenu;
