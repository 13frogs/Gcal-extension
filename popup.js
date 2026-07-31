document.getElementById("load").onclick = async () => {

    const token = await getToken();

    const data = await getCalendarEvents(token);

    let totals = {};

    data.items.forEach(event => {

        if (!event.start.dateTime || !event.end.dateTime)
            return;

        let hours =
            (new Date(event.end.dateTime) -
             new Date(event.start.dateTime))
             / 3600000;

        let title = event.summary || "Other";

        if (!(title in totals))
            totals[title] = 0;

        totals[title] += hours;
    });

    let html = "";

    for (let cls in totals) {

        html += `<p>${cls}: ${totals[cls].toFixed(2)} hrs</p>`;
    }

    document.getElementById("results").innerHTML = html;
});
