import React, { Component } from 'react';
import cx from 'classnames';

import {Icon} from '~/components'
import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuHeader,
    ContextMenuSeperator,
} from '../ContextMenu'

import { emitContextMenuClose } from '~/events';

const i = Lurka.icons;

class ThreadImageContextMenu extends Component {
    constructor(props) {
        super(props);
    }

    closeMenu(e) {
        e.stopPropagation();
        emitContextMenuClose();
    }

    render() {
        const { className, media: { srcLarge, thumbnail } } = this.props;

        return (
            <ContextMenu className={cx('ThreadImageContextMenu', className)} onClick={this.closeMenu}>
                <a href={srcLarge} download>
                    <ContextMenuItem>
                        <Icon name={i.threadContextMenuDownload}/>
                        <span>Download</span>
                    </ContextMenuItem>
                </a>
                <a href={this.getReverseSearchUrl(thumbnail)} target="_blank">
                    <ContextMenuItem onClick={this.reverseSearch}>
                        <Icon name={i.threadContextMenuReverseSearch}/>
                        <span>Reverse search</span>
                    </ContextMenuItem>
                </a>
            </ContextMenu>
        );
    }

    getReverseSearchUrl(src) {
        return `https://www.google.com/searchbyimage?image_url=${src}`
    }
}

export default ThreadImageContextMenu;
