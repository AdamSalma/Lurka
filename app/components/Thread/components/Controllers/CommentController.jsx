import React from 'react'
import { Icon, ButtonCircle } from '~/components/UI'

export default function(props) {
    // const { } = props;

    const toggledProps = {
        name: "mesage-1"
    }

    const defaultProps = {
        name: "mesage-1"
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
