import React from 'react'
import { Icon, Tooltip } from '~/components/UI'

const i = Lurka.icons

const ControlMenu = ({ onImageDownload, onReply, onImageSearch, onReport, onPostHide }) => {
    // TODO: Add functionality to thread icons
    // const { download, openReferences, ...} = controls
    return (
        <div className="ThreadPost__controls">
            <div className="menu-toggle">
                <Icon name={i.threadPostMenu} />
            </div>
            <ul className="menu">
                <li>
                    <Tooltip content="Save Image">
                        <Icon
                            name={i.threadPostControlsDownload}
                            onClick={onImageDownload}
                        />
                    </Tooltip>
                </li>
                <li>
                    <Tooltip content="Reply">
                        <Icon name={i.threadPostControlsReply}/>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip content="Source">
                        <Icon name={i.threadPostControlsImageSearch}/>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip content="Report">
                        <Icon name={i.threadPostControlsReport}/>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip content="Hide">
                        <Icon name={i.threadPostControlsHide}/>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}

ControlMenu.displayName = 'ControlMenu';

export default ControlMenu;
