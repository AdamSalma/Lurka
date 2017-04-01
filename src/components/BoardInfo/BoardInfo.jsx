import './BoardInfo.styles'
import React, {Component} from 'react';
import classes from 'classnames'

import {convertBytes, commaify} from '~/utils'


export default function BoardInfo(props) {
    const {
        is_archived, 
        max_filesize,
        max_comment_chars, 
        image_limit, 
        max_webm_duration, 
        max_webm_filesize, 
        NSFW,
        bump_limit,
        cooldowns,
        user_ids,
        country_flags,
        spoilers,
        custom_spoilers,
        text_only,
        require_subject,
        sjis_tags,
        min_image_width,
        min_image_height,
        webm_audio,
        forced_anon,
        math_tags,
        code_tags,
        oekaki
    } = props;

    return (
        <div className="board-info">
            <ul>
                <li>{is_archived ? "Is Archived" : "No Archive"}</li>
                {image_limit && 
                    <li>Image limit: {convertBytes(image_limit).megabytes}</li>}
                {max_filesize && 
                    <li>Max filesize: {convertBytes(max_filesize).megabytes}</li>}
                {max_comment_chars && <li>Max comment characters: {commaify(max_comment_chars)}</li>}
                {max_webm_duration && <li>Max WebM duration: {max_webm_duration}</li>}
                {max_webm_filesize && 
                    <li>Max WebM filesize: {convertBytes(max_webm_filesize).megabytes}</li>}
                <li>{NSFW ? "NSFW" : "SFW"}</li>
                {bump_limit && <li>Bump limit: {bump_limit}</li>}
                {cooldowns && <li>{formatCooldowns(cooldowns)}</li>}
                {user_ids && <li>User IDs shown</li>}
                {country_flags && <li>Country flags shown</li>}
                {spoilers && <li>Has spoilers</li>}
                {custom_spoilers && <li>Has custom spoilers</li>}
                {text_only && <li>Text only</li>}
                {require_subject && <li>Threads require subject</li>}
                {sjis_tags && <li>Has sjis tags</li>}
                {min_image_width && <li>Min image size: {min_image_width}x{min_image_height}</li>}
                {!webm_audio && <li>Webm audio disabled</li>}
                {forced_anon && <li>Forced anonymity</li>}
                {math_tags && <li>Has math tags</li>}
                {code_tags && <li>Has code tags</li>}
                {oekaki && <li>Has oekaki</li>}
            </ul>
        </div>
    )
}


function formatCooldowns({threads, replies, images}){
    return <div className="cooldowns">
        <h5>Cooldowns</h5>
        <ul>
            <li>Threads: {threads ? threads : 0}s</li>
            <li>Replies: {replies ? replies : 0}s</li>
            <li>Images: {images ? images : 0}s</li>
        </ul>
    </div>
}
