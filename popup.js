document.getElementById("load").addEventListener("click", async () => {

    console.log("Load Calendar clicked");

    try {

        const data = await chrome.storage.local.get("token");

        console.log("Token:", data.token);


        if (!data.token) {

            document.getElementById("results").innerHTML =
            "No Google token. Click Sign In first.";

            return;
        }


        console.log("Requesting calendar...");

        const calendar = await loadCalendarEvents(data.token);


        console.log("Calendar response:", calendar);


        if (!calendar.items) {

            throw new Error("No calendar events returned");

        }


        const totals = calculateHours(calendar.items);


        console.log("Totals:", totals);


        let html = "<table>";

        for (let course in totals) {

            html += `
            <tr>
            <td>${course}</td>
            <td>${totals[course].toFixed(2)} hrs</td>
            </tr>
            `;

        }

        html += "</table>";

        document.getElementById("results").innerHTML = html;


    } catch(error) {

        console.error("ERROR:", error);

        document.getElementById("results").innerHTML =
        "Error: " + error.message;

    }

});
