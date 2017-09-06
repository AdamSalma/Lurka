/**
 * Standardises a 4chan boardlist into a global format.
 *
 * @param  {Object} boardList - Directly from 4chan's API
 * @return {Array}            - Array of extracted boardlists objects
 */
export default function parseBoardList( boardList ) {
    console.info(`Discovered ${boardList.length} 4chan boards`);
    return boardList.map( board => {
        // Essential stuff
        const { board: boardID, title, meta_description } = board
        const url = `/${boardID}/`;

        // Board info
        const {
            is_archived,
            max_filesize,
            max_comment_chars,
            image_limit,
            max_webm_duration,
            max_webm_filesize,
            ws_board,
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
        } = board

        return {
            boardID,
            title: title.split('/').join(' / '),  // x/y => x / y (to allow text wrapping)
            url,
            short_desc: `${url} - ${title}`,
            description: meta_description,
            info: {
                is_archived,
                max_filesize,
                max_comment_chars,
                image_limit,
                max_webm_duration,
                max_webm_filesize,
                NSFW: 1 - ws_board,
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
            }
        }

    });
}

