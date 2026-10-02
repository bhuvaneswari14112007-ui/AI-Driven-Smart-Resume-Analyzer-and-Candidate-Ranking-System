# AI-Driven Smart Resume Analyzer and Candidate Ranking System

## Project Description

The AI-Driven Smart Resume Analyzer and Candidate Ranking System is a web-based application designed to analyze resumes and compare candidate skills with job requirements.

The system allows users to upload a PDF resume, extracts important candidate information such as name, email, skills, education, and experience, and calculates a resume analysis score. It also compares the candidate's skills with the required skills for a job and generates a matching score that can be used for candidate ranking.

## Features

- User login interface
- Resume upload in PDF format
- Resume text extraction
- Candidate name and email extraction
- Skill detection
- Education and experience detection
- Resume analysis score
- Job requirement input
- Candidate-job skill matching
- Matched and missing skills display
- Job match score
- Candidate ranking based on matching score

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Java
- Spring Boot
- REST API
- Apache PDFBox
- Maven

## System Workflow

1. User logs into the system.
2. User uploads a PDF resume.
3. The backend receives the resume through a REST API.
4. Apache PDFBox extracts text from the PDF.
5. The system identifies candidate details and skills.
6. A resume analysis score is generated.
7. The user enters job requirements and required skills.
8. The system compares resume skills with job requirements.
9. Matched and missing skills are displayed.
10. A job matching score is calculated for candidate ranking.

## Project Structure

```text
AI-Driven-Smart-Resume-Analyzer-and-Candidate-Ranking-System

├── Frontend
│   ├── login.html
│   ├── dashboard.html
│   ├── upload.html
│   ├── result.html
│   ├── job.html
│   ├── match.html
│   ├── style.css
│   └── script.js
│
├── Backend
│   ├── pom.xml
│   ├── ResumeAnalyzerApplication.java
│   ├── ResumeController.java
│   ├── ResumeService.java
│   └── ResumeResult.java
