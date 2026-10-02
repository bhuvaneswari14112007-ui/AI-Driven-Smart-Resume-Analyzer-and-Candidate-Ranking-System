// ======================================================
// SMART RESUME ANALYZER - script.js
// ======================================================


// ======================================================
// LOGIN
// ======================================================

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();


    if (email === "" || password === "") {

        alert("Please enter email and password.");

        return;
    }


    // Clear OLD resume when starting a new login
    localStorage.removeItem("resumeResult");
    localStorage.removeItem("resumeFileName");
    localStorage.removeItem("jobData");


    // Save current login
    localStorage.setItem(
        "loggedInEmail",
        email
    );


    window.location.href =
        "dashboard.html";
}



// ======================================================
// SHOW FILE NAME
// ======================================================

function showFileName() {

    const fileInput =
        document.getElementById("resumeFile");

    const fileName =
        document.getElementById("fileName");


    if (!fileInput || !fileName) {
        return;
    }


    const file =
        fileInput.files[0];


    if (file) {

        fileName.innerText =
            "Selected file: " + file.name;

    } else {

        fileName.innerText = "";

    }
}



// ======================================================
// UPLOAD RESUME
// ======================================================

async function uploadResume() {

    const fileInput =
        document.getElementById("resumeFile");


    if (!fileInput) {

        alert("Resume input not found.");

        return;
    }


    const file =
        fileInput.files[0];


    if (!file) {

        alert("Please select a resume PDF.");

        return;
    }


    if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    ) {

        alert("Please select a PDF file only.");

        return;
    }


    // ==================================================
    // IMPORTANT
    // REMOVE ALL OLD RESUME DATA
    // ==================================================

    localStorage.removeItem("resumeResult");
    localStorage.removeItem("resumeFileName");
    localStorage.removeItem("jobData");


    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );


    try {

        const button =
            document.querySelector("button");


        if (button) {

            button.disabled = true;

            button.innerText =
                "Analyzing Resume...";

        }


        // ==================================================
        // SEND NEW PDF TO JAVA
        // ==================================================

        const response =
            await fetch(
                "http://localhost:8080/api/resume/upload",
                {
                    method: "POST",
                    body: formData
                }
            );


        if (!response.ok) {

            throw new Error(
                "Server Error: " +
                response.status
            );

        }


        // ==================================================
        // GET NEW RESULT
        // ==================================================

        const result =
            await response.json();


        console.log(
            "NEW RESUME RESULT:",
            result
        );


        // ==================================================
        // SAVE ONLY THE NEW RESUME
        // ==================================================

        localStorage.setItem(
            "resumeResult",
            JSON.stringify(result)
        );


        localStorage.setItem(
            "resumeFileName",
            file.name
        );


        console.log(
            "CURRENT RESUME:",
            localStorage.getItem(
                "resumeResult"
            )
        );


        // ==================================================
        // SUCCESS
        // ==================================================

        alert(
            "New resume analyzed successfully!"
        );


        // Go to result
        window.location.href =
            "result.html";

    }


    catch (error) {

        console.error(
            "Upload Error:",
            error
        );


        alert(
            "Cannot connect to Java backend.\n\n" +
            "Please make sure Spring Boot is running on port 8080."
        );


        const button =
            document.querySelector("button");


        if (button) {

            button.disabled = false;

            button.innerText =
                "Analyze Resume";

        }

    }

}



// ======================================================
// DASHBOARD
// ======================================================

function loadDashboardResume() {

    const savedData =
        localStorage.getItem(
            "resumeResult"
        );


    // Dashboard elements

    const status =
        document.getElementById(
            "resumeStatus"
        );

    const score =
        document.getElementById(
            "dashboardScore"
        );

    const progress =
        document.getElementById(
            "progressScore"
        );

    const heading =
        document.getElementById(
            "matchingHeading"
        );

    const description =
        document.getElementById(
            "matchingDescription"
        );

    const name =
        document.getElementById(
            "dashboardName"
        );

    const email =
        document.getElementById(
            "dashboardEmail"
        );

    const skills =
        document.getElementById(
            "dashboardSkills"
        );

    const tableScore =
        document.getElementById(
            "dashboardTableScore"
        );

    const candidateStatus =
        document.getElementById(
            "candidateStatus"
        );

    const candidateUser =
        document.getElementById(
            "candidateUser"
        );



    // ==================================================
    // NO RESUME
    // ==================================================

    if (!savedData) {

        if (status)
            status.innerText =
                "Not Analyzed";

        if (score)
            score.innerText =
                "--";

        if (progress)
            progress.innerText =
                "--";

        if (heading)
            heading.innerText =
                "No Resume Analyzed Yet";

        if (description)
            description.innerText =
                "Upload your resume to analyze your skills and calculate your resume analysis score.";

        if (name)
            name.innerText =
                "No resume uploaded";

        if (email)
            email.innerText =
                "--";

        if (skills)
            skills.innerText =
                "--";

        if (tableScore)
            tableScore.innerText =
                "--";

        if (candidateStatus)
            candidateStatus.innerText =
                "Not Analyzed";

        if (candidateUser)
            candidateUser.innerText =
                "Candidate User";

        return;
    }



    // ==================================================
    // NEW RESUME EXISTS
    // ==================================================

    try {

        const resume =
            JSON.parse(
                savedData
            );


        console.log(
            "DASHBOARD CURRENT RESUME:",
            resume
        );


        const matchScore =
            resume.matchScore ?? 0;


        if (status)
            status.innerText =
                "Analyzed";


        if (score)
            score.innerText =
                matchScore + "%";


        if (progress)
            progress.innerText =
                matchScore + "%";


        if (heading)
            heading.innerText =
                "Resume Analyzed Successfully";


        if (description)
            description.innerText =
                "Your latest resume has been analyzed successfully.";


        if (name)
            name.innerText =
                resume.name ||
                "Name not found";


        if (email)
            email.innerText =
                resume.email ||
                "Email not found";


        if (skills)
            skills.innerText =
                resume.skills ||
                "No skills found";


        if (tableScore)
            tableScore.innerText =
                matchScore + "%";


        if (candidateStatus)
            candidateStatus.innerText =
                "Analyzed";


        if (candidateUser)
            candidateUser.innerText =
                resume.name ||
                "Candidate User";

    }


    catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}



// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboardResume();

    }
);