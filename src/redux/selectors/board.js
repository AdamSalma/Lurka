import { createSelector } from 'reselect'

export const getIsBoardFetching = state => state.board.isFetching
export const getBoardPosts = state => state.board.posts
export const getBoardSearchTerms = state => state.board.search
export const getBoardFilterTerms = state => state.board.filters
export const isBoardBeingSearched = state => !!state.board.search;
export const isBoardFiltered = state => state.board.filters.length > 0


export const getBoardPostsBySearch = createSelector(
    getBoardPosts,
    getBoardSearchTerms,
    (posts, search) =>
        posts.filter(({ title="", comment="" }) =>
            title.toLowerCase().includes(search) || comment.toLowerCase().includes(search)

    )
)

export const getBoardPostsByFilter = createSelector(
    getBoardPosts,
    getBoardFilterTerms,
    (posts=[], filters) =>
        posts.filter(({ title="", comment="" }) => {
            var shouldKeep = true;
            for (var i = 0; i < filters.length; i++) {
                if (
                    title.toLowerCase().includes(filters[i])
                    || comment.toLowerCase().includes(filters[i])
                ) {
                    shouldKeep = false
                    break
                }
            }
            return shouldKeep
        })
)
