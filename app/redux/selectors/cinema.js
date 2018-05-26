import { createSelector } from 'reselect'
import { getThreadPosts } from './thread'

export const getCinemaIsActive = (state) => state.cinema.isActive;
export const getCinemaTimeline = (state) => state.cinema.timeline;
export const getCinemaEntityCount = (state) => state.cinema.entities.count;
export const getViewPosition = (state) => state.cinema.entities.viewPosition;

export const getCinemaUpdateIfChanged = createSelector(
    getThreadPosts,
    getCinemaEntityCount,
    getViewPosition,
    (posts, currentCount, position) => {
        const media = posts.filter(post => post.media).map(post => post.media)

        if (media.length === currentCount) {
            return false
        }

        const update = {
            count: media.length,
            timeline: {
                previous: [],
                current: null,
                next: []
            }
        }

        for (var i = 0; i < media.length; i++) {
            if (i < position) {
                update.timeline.previous.push(media[i])
            } else if (i == position) {
                update.timeline.current = media[i]
            } else {
                update.timeline.next.push(media[i])
            }
        }

        return update
    }
)
