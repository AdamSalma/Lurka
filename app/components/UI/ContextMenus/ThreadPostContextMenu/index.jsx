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
  URL_PATTERN = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;

  constructor(props) {
    super(props);
  }

  closeMenu(e) {
    e.stopPropagation();
    emitContextMenuClose();
  }

  render() {
    const { className, post } = this.props;
    const textSelection = window.getSelection().toString();
    const urlSelection = this.parseForUrl(textSelection)
    // const {id, name, title, date, media, comment, references, time} = post;

    return (
      <ContextMenu
        className={cx("ThreadPostContextMenu", className)}
        onClick={this.closeMenu}
      >
        {!!textSelection && (
          <ContextMenuItem>
            <CopyToClipboard>
              <span>Copy</span>
            </CopyToClipboard>
          </ContextMenuItem>
        )}
        {!!urlSelection && (
          <ContextMenuItem>
            <a href={urlSelection} target="_blank">
              <span>Go to {this.extractHostname(urlSelection)}</span>
            </a>
          </ContextMenuItem>
        )}
        <ContextMenuItem onClick={this.onReply}>
          <span>Reply</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <span>Bookmark post</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <span>Report post</span>
        </ContextMenuItem>
      </ContextMenu>
    );
  }

  onReply = e => {
    emitPostToggle({
      context: "thread",
      override: true,
      quoteUser: this.props.post.id
    });
  };

  parseForUrl(text) {
      text = text.trim();
      var result = text.match(this.URL_PATTERN);

      // Handle occurances where url has spaces in it
      // (on 4chan this is used by posters to avoid detection when posting external links)
      if (result === null) {
          // remove spaces
          text = text.split(' ').join()
          // try again
          result = text.match(this.URL_PATTERN);
      }

      return result ? result[0] : null;
  }

  extractHostname(url) {
    var hostname;

    // Find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    // Remove port number
    hostname = hostname.split(':')[0];
    // Remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }
}

export default ThreadPostContextMenu;
