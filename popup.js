// popup.js

console.log("popup.js loaded");


// Google Sign In button
const loginButton = document.getElementById("login");

loginButton.addEventListener("click", async () => {

    console.log("Sign In clicked");

    try {

        const token = await getToken();

        await chrome.storage.local.set({
            token: token
        });

        console.log("Token saved");

        document.getElementById("results").innerHTML =
            "✅ Google Calendar connected!";


    } catch (error) {

        console.error("Login error:", error);

        document.getElementById("results").innerHTML =
            "❌ Login failed: " + error.message;

    }

});



// Load Calendar button
const loadButton = document.getElementById("load");

loadButton.addEventListener("click", async () => {

    console.log("Load Calendar clicked");


    try {

        // Retrieve saved Google token
        const data = await chrome.storage.local.get("token");


        if (!data.token) {

            document.getElementById("results").innerHTML =
                "⚠️ Please click Sign In first.";

            return;

        }


        document.getElementById("results").innerHTML =
            "Loading calendar...";


        // Get calendar events
        const calendar = await loadCalendarEvents(data.token);


        console.log("Calendar data:", calendar);


        if (!calendar.items || calendar.items.length === 0) {

            document.getElementById("results").innerHTML =
                "No calendar events found.";

            return;

        }


        // Calculate hours
        const totals = calculateHours(calendar.items);


        console.log("Class totals:", totals);


        // Display results
        let html = `
        <table>
        <tr>
            <th>Class</th>
            <th>Hours</th>
        </tr>
        `;


        for (const course in totals) {

            html += `
            <tr>
                <td>${course}</td>
                <td>${totals[course].toFixed(2)}</td>
            </tr>
            `;

        }


        html += "</table>";


        document.getElementById("results").innerHTML = html;


    } catch (error) {


        console.error("Calendar error:", error);


        document.getElementById("results").innerHTML =
            "❌ Calendar error: " + error.message;


    }

});
