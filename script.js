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


//INSERT Record Add a new job application to the database
const applicationForm = document.getElementById("applicationForm");
const statusMessage = document.getElementById("statusMessage");

async function addApplication(event) { 
    event.preventDefault();

    const newApplication = {
        company: document.getElementById("company").value.trim(),
        job_title: document.getElementById("position").value.trim(),
        application_status: document.getElementById("status").value,
        fit_score: Number(document.getElementById("fitScore").value) || null,
        resume_used: document.getElementById("resumeUsed").value.trim() || null,
        job_url: document.getElementById("jobUrl").value.trim() || null
    };

    const dateValue = document.getElementById("dateApplied").value;
        if (dateValue) newApplication.date_applied = dateValue;

        if (!newApplication.company || !newApplication.job_title) {
            showMessage("Company and Job Title are required.", "error");
            return;
        }

    const submitBtn = applicationForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        showMessage("Saving...", "info");

    const { error } = await db.from("job_applications").insert([newApplication]);

        submitBtn.disabled = false;

    if (error) {
        console.error(error);
        showMessage(`Could not save application: ${error.message}`, "error");
        return;
    }

    showMessage(`Added ${newApplication.company} - ${newApplication.job_title}.`, "success");
    applicationForm.reset();
    loadApplications();
    }

    // Show status messages to the user
    function showMessage(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = type; // style .success, .error, .info in CSS
}



// Load applications on page load when button is pressed
document.getElementById("loadBtn").addEventListener("click", loadApplications);

// Run addApplication when the form is submitted
applicationForm.addEventListener("submit", addApplication);