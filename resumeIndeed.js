function initAboutPage() {
    if (window.resumePageInitialized) return; // ✅ prevent double init
    window.resumePageInitialized = true;

    const jobs = [
        {
            title: "Software Engineer",
            company: "InSightGlobal",
            dates: "Oct 2024 – Feb 2025",
            description: `
          - Built accessible, dynamic UIs with React, JavaScript, HTML, and CSS.<br>
          - Developed REST APIs with Node.js and PostgreSQL within the web app’s modularity.<br>
        `
        },
        {
            title: "Software Engineer",
            company: "Cloud Wave",
            dates: "July 2022 – April 2024",
            description: `
          - Developed scalable Azure-based ASP.NET Core applications.<br>
          - Built multithreaded Python tools on Ubuntu for backend processing.<br>
          - Integrated Azure Functions, IoT Hub, Event Hubs, and Cosmos DB.
        `
        },
        {
            title: "Software Developer",
            company: "The JAAW Group",
            dates: "Sept 2021 – June 2022",
            description: `
          - Created C# multithreaded services with Redis and RabbitMQ.<br>
          - Designed and maintained a Blazor front-end site.<br>
          - Worked on real-time message processing systems.
        `
        },
        {
            title: "Software Developer",
            company: "SS&C",
            dates: "Nov 2018 – May 2021",
            description: `
          - Enhanced ASP.NET MVC applications for financial services.<br>
          - Migrated WCF services to REST APIs.<br>
          - Delivered solutions in Agile teams with test automation.
        `
        },
        {
            title: "Software Engineer in Test",
            company: "Collebra Solutions",
            dates: "Jan 2017 – Oct 2018",
            description: `
          - Created a WinForms-based test automation tool in C# to save days of repetitive manual testing.<br>
          - Developed an AngularJS dashboard to visualize testing metrics to show how testing is progressing to management.<br>
          - Designed QA automation practices to accelerate test cycles.<br>
        `
        },
        {
            title: "Summary",
            company: "Skills",
            dates: "Aug 2015 – Apr 2025",
            description: `
          - Languages: C#, Python, JavaScript, SQL, HTML, CSS.<br>
          - Frameworks/Libraries: React, Node.js, ASP.NET, Blazor, AngularJS, REST APIs, MVVM, WPF, WinForms.<br>
          - Databases: PostgreSQL, SQL Server, Azure Cosmos DB.<br>
          - Cloud/DevOps: Azure, Azure DevOps, GitHub Actions, CI/CD.<br>
          - Tools: Git, Docker, Jira, Visual Studio, VS Code.<br>
          - Testing/Other: Unit Testing, Integration Testing, Test Automation: Selenium, Jest, Cypress.<br>
        `
        },
    ];

    const jobListEl = document.getElementById("jobList");
    const jobDetailsEl = document.getElementById("jobDetails");


    jobs.forEach((job, index) => {
        const item = document.createElement("div");
        item.classList.add("job-item");
        item.innerHTML = `<strong>${job.title}</strong><br><span>${job.company}</span>`;

        item.addEventListener("click", () => {
            // Highlight selected
            document.querySelectorAll(".job-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");

            // Split description into lines
            const lines = job.description.trim().split("<br>");
            let descriptionHTML = '';
            lines.forEach((line, i) => {
                descriptionHTML += `<div class="fade-line" style="animation-delay: ${i * 0.5}s">${line}</div>`;
            });

            // Update job detail panel
            jobDetailsEl.innerHTML = `
          <div class="job-title">${job.title}</div>
          <div class="company">${job.company}</div>
          <div class="dates">${job.dates}</div>
          <div class="description">${descriptionHTML}</div>
        `;
        });


        jobListEl.appendChild(item);

    });
}