import * as types from '~/redux/types';

export default function cycleCinemaTimeline({ cycleAmount, nextPosition }) {
    return (dispatch, getState) => {
        const state = getState();

        if (!cycleAmount || cycleAmount == 0) {
            console.warn("cycleCinemaTimeline rejected; cycleAmount was 0");
            return
        }

        if (isNaN(nextPosition)) {
            nextPosition = state.cinema.entities.viewPosition + cycleAmount
        }

        const timeline = cycleTimelineIfValid(state, nextPosition)

        if (timeline) {
            dispatch(cinemaTimelineCycled(timeline, nextPosition))
        }
    }
}

export const cycleTimelineIfValid = (state, nextPosition) => {
    const entities = state.cinema.entities
    const totalEntities = entities.count
    if (!shouldCycleTimeline(totalEntities, nextPosition)) {
        console.warn(`cycleCinemaTimeline rejected; nextPosition (${nextPosition}) was not in range (${totalEntities}).`)
        return false
    }

    console.log(entities.viewPosition, nextPosition)
    const difference = nextPosition - entities.viewPosition
    const positiveDifference = difference >= 0


    const oldt = entities.timeline

    const update = {
        viewPosition: nextPosition,
        timeline: {
            previous: [ ...oldt.previous ],
            current: oldt.current,
            next: [ ...oldt.next ]
        }
    }

    console.log("WAS:", update.timeline)
    console.log("DIFFERENCE: ", difference)

    for (var i = 0; i < Math.abs(difference); i++) {
        if (positiveDifference) {
            console.log("POSITIVE DIFF")
            const current = update.timeline.current
            const next = update.timeline.next.shift()
            update.timeline.previous.push(current)
            update.timeline.current = next
        } else {
            console.log("NEGATIVE DIFF")
            const current = update.timeline.current
            const previous = update.timeline.previous.pop()
            update.timeline.next.push(current)
            update.timeline.current = previous
        }
    }

    console.log("NOW:", update.timeline)
    return update
}

export const shouldCycleTimeline = (totalEntities, nextPosition) => {
    return nextPosition && nextPosition < totalEntities && nextPosition >= 0
}

export const cinemaTimelineCycled = (payload, nextPosition) => {
    return {
        type: types.CINEMA_TIMELINE_CYCLED,
        payload, nextPosition
    }
}
