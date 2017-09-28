
/**
 * Hardcoded board categories - 4chan's API doesn't provide it.
 * Could be obtained by web scraping their front page but is not efficient
 *
 * @type {Object}
 */
export const categories = [{
    category: "Japanese Culture",
    boards: ['a', 'c', 'w', 'm', 'cgl', 'cm', 'n', 'jp']
}, {
    category: "Video Games",
    boards: ['v', 'vg', 'vp', 'vr']
}, {
    category: "Intrests",
    boards: ['co', 'g', 'tv', 'k', 'o', 'an', 'tg', 'sp', 'asp', 'sci', 'his', 'int', 'out', 'toy']
}, {
    category: "Creative",
    boards: ['i', 'po', 'p', 'ck', 'ic', 'wg', 'lit', 'mu', 'fa', '3', 'gd', 'diy', 'wsg', 'qst']
}, {
    category: "Other",
    boards: ['biz', 'trv', 'fit', 'x', 'adv', 'lgbt', 'news', 'wsr', 'vip']
}, {
    category: "Misc",
    boards: ['b', 'r9k', 'pol', 'bant', 'soc', 's4s']
}, {
    category: "Adult",
    boards: ['s', 'hc', 'hm', 'h', 'e', 'u', 'd', 'y', 't', 'hr', 'gif', 'aco', 'r']
}]

export const getBoardCategory = (boardID) => {
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].boards.indexOf(boardID) >= 0) {
            return categories[i].category
        }
    }

    // New boards will be added over time - these will get put into "New" until
    // a patch is applied.
    return "New"
}

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
            category: getBoardCategory(boardID),
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

