import React from 'react'
import { Icon, ButtonCircle } from '~/components'

export default function(props) {
    // const { } = props;

    const toggledProps = {
        name: "update"
    }

    const defaultProps = {
        name: "update"
    }

    {/* OR
        right facing:
        <Icon name="message" />
        <Icon name="message-text" />
        
        left facing:
        <Icon name="message-reply-text" />  
        <Icon name="message-reply-text" />
        <Icon name="reply" />  addow facing left

    */}

    return <ButtonCircle toggleProps={toggledProps}>
        <Icon {...defaultProps} /> 
    </ButtonCircle>
}
