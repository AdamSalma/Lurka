import React from 'react'
import { IconCircle } from '~/components'

const i = window.appSettings.icons
export default function(props) {
    // const { } = props;

    const defaultProps = {
        name: i.threadPostControlsBookmark
    }

    /*Save to archive
        <Icon name="delete" />
        bin icon -> to remove from archive

       OR use this instead of 'download':
        <Icon name="library-plus" />

       OR this. looks the best imo:
        <Icon name="package-down" />
    */
    return <IconCircle {...defaultProps}/>
}
