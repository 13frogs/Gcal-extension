async function getCalendarEvents(token) {

    const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
            headers: {
                Authorization: "Bearer " + token
            }
        });

    return await response.json();
}
