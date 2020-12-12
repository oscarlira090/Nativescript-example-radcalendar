export const getEvents = state => {
    return state.events.filter(item => item.type == 'event' );
}


export const getEventsCalendar = state => {
    return state.eventsCalendar
}

export const getEvent = state => {
    return state.event
}