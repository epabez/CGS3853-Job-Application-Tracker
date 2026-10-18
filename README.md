# **<u>Job Application Tracker</u>**

This is a Web App for tracking job applications, built for CGS3853 Web Systems for IT (Project 4)

## Tech Stack
- HTML, CSS, Javascript
- Supabase (PostgreSQL)

## Setup

1. Create a Supabase project and run 'schema.sql' in the SQL Editor
2. In your JS file, replace the URL and the publishable key with the free Supabase DB
3. Open HTML file in browser

## Database Table:

Below is a photo of the database table utilized inside of the application

![Supabase job_applications table](Additional%Files\EthanVasquezSupaBasetablescreenshotProject4.png)

## Web App up and functioning with Sample Data

![Web App with Sample Data](Additional%Files\CompletedWebsitewithDatafromDB.png)

## Notes
The RLS policies are demo-only and allow anyone to READ & INSERT records, they'll be removed after grading.

## Reflection:

My app takes and displays Job application data. It allows for tracking of 8 data points: Job ID, Company, Job_title/position, application status, fit_score, resume used, date applied, and the job url. I chose these data field because for a while I'd been tracking internships inside of an excel spreadsheet with these exact columns in mind so it just made sense to utilize it in this fashion. I verified persistence by checking Supabase to ensure it had been edited and additionally the data stays when you refresh and click the view jobs button. 
The way it works => It starts at HTML when you input all the necessary inputs, Javascript then serves as the connector to the Supabase postgreSQL DB and utilizes the same value names as the columns inside of supabase and makes the necessary additions. When you then click view jobs, it returns the total table where javascript then runs again and changes/updates the necessary text, CSS is also adding the styling while these changes occur.