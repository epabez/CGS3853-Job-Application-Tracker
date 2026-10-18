// Define Supabase URL and Key
const SUPABASE_URL = "https://bxcmfusfybdnetyyaznt.supabase.co";
const SUPABASE_KEY = "sb_publishable_zRyMk-rjZjJyCjS1KRnygA_D-pPf-qA";


// Connect to Supabase
const db = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

// READ Records Get jobs from the database (This reads/displays the data in the job_applications table)
async function loadApplications() {

    const jobList = document.getElementById("jobList");

    jobList.textContent = "Loading job applications...";

    const { data, error } = await db
        .from("job_applications")
        .select("*");

    if (error) {
        console.error(error);
        jobList.textContent = "Error loading job applications.";
        return;
    }

    jobList.innerHTML = "";

    if (data.length === 0) {
        jobList.textContent = "No applications yet. Add one with the form.";
        return;
    }

    data.forEach(app => {

    const card = document.createElement("div");
        card.className = "app-card";
        card.dataset.status = app.application_status; // lets CSS color cards by status

    const heading = document.createElement("h3");
        heading.textContent = `${app.company} - ${app.job_title}`;

    const status = document.createElement("p");
        status.textContent = `Status: ${app.application_status}`;

    const fit = app.fit_score ? `${app.fit_score}/10` : "N/A";

    const details = document.createElement("p");
        details.textContent =
            `Fit: ${fit} | Resume: ${app.resume_used || "N/A"} | Applied: ${app.date_applied || "N/A"}`;

    card.append(heading, status, details);
    jobList.appendChild(card);

  });

  console.log("Applications retrieved.", data);
}


// Load applications on page load when button is pressed
document.getElementById("loadBtn").addEventListener("click", loadApplications);