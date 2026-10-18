-- NOTE: This schema.sql file is a culmination of all of the queries I sent into supabase. Some queries were run separately.

-- Create the job_applications table
create table public.job_applications (
  id bigint generated always as identity primary key,
  company text not null,
  job_title text not null,
  application_status text not null default 'Applied'
    check (application_status in ('Not Applied Yet', 'Applied', 'Online Assessment', 'Interviewing', 'Offer', 'Rejected')),
  fit_score smallint check (fit_score between 1 and 10),
  resume_used text,
  date_applied date,
  job_url text
);

-- Inserted sample data into the job_applications table
insert into public.job_applications
  (company, job_title, application_status, fit_score, resume_used, date_applied, job_url)
values
  ('Company A', 'Data Analyst Intern', 'Interviewing', 8, 'DataAnalyst_v2', '2026-09-12', 'https://companya.example/jobs/da-intern'),
  ('Company B', 'Health IT Intern', 'Not Applied Yet', 9, 'HealthIT_v1', null, 'https://companyb.example/jobs/health-it-intern'),
  ('Company C', 'Software QA Intern', 'Online Assessment', 7, 'QA_v3', '2026-09-25', 'https://companyc.example/jobs/qa-intern'),
  ('Company D', 'Software Engineer Intern', 'Rejected', 6, 'SWE_v4', '2026-08-30', 'https://companyd.example/jobs/swe-intern'),
  ('Company E', 'Technical Program Manager Intern', 'Offer', 8, 'TPM_v1', '2026-09-05', 'https://companye.example/jobs/tpm-intern');

select * FROM public.job_applications;

-- Adjusted permissions for the job_applications table

-- Turn on row-level security
ALTER TABLE public.job_applications
ENABLE ROW LEVEL SECURITY;

-- Allow the website to read and add applications
GRANT SELECT, INSERT
ON public.job_applications TO anon;

-- Allow new records to receive automatic IDs
GRANT USAGE, SELECT
ON SEQUENCE public.job_applications_id_seq TO anon;

-- Allow visitors to view fictional applications
CREATE POLICY "View demo applications"
ON public.job_applications
FOR SELECT
TO anon
USING (true);

-- Allow visitors to add fictional applications
CREATE POLICY "Add demo applications"
ON public.job_applications
FOR INSERT
TO anon
WITH CHECK (true);

-- View the table at the end of the script to verify that the data was inserted correctly
Select * from public.job_applications;