import React from 'react'
import { Icon } from '~/components'

const i = window.appSettings.icons

const Controls = ({ controls }) => {
    // TODO: Add functionality to thread icons
    // const { download, openReferences, ...} = controls
    return (
        <div className="thread-post-controls">
            <div className="controls-menu-toggle">
                <Icon name={i.threadPostMenu} />
            </div>
            <ul className="controls-menu">
                <li onClick={()=> console.log('Clicked on download icon')}>
                    <span><Icon name="download"/>
                        Download
                    </span>
                </li>
                <li>
                    <span><Icon name="reply"/>
                        Reply
                    </span>
                </li>
                <li>
                    <span><Icon name="comment-text"/>
                        Something else
                    </span>
                </li>
            </ul>
        </div>
    )
}

Controls.displayName = 'Controls';

export default Controls;
