import React from 'react'
import { Icon, ButtonCircle } from '~/components'

export default function(props) {
    // const { } = props;

    const toggledProps = {
        name: "package-down"
    }

    const defaultProps = {
        name: "package-down"
    }

    /*Save to archive
        <Icon name="delete" /> 
        bin icon -> to remove from archive

       OR use this instead of 'download':
        <Icon name="library-plus" /> 

       OR this. looks the best imo:
        <Icon name="package-down" />   
    */
    return <ButtonCircle toggleProps={toggledProps}>
        <Icon {...defaultProps} /> 
    </ButtonCircle>
}
