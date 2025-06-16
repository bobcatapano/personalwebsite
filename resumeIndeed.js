function initAboutPage() {
    if (window.resumePageInitialized) return; // ✅ prevent double init
    window.resumePageInitialized = true;

    const jobs = [
        {
            title: "Software Engineer",
            company: "InSightGlobal",
            dates: "Oct 2024 – Feb 2025",
            description: `
          - Developed/Maintained dynamic web pages using React, JavaScript, Node.js, and ExpressJS, using PostgreSQL as its database.<br>
          - Developed front-end features using React front-end with ASP.NET Core, which used an MS SQL database.<br>
          - Built automated test suites using Jest (unit) and Cypress (end-to-end).<br>
          - Utilized GitLab and participated in Agile sprints with Atlassian Jira.
        `
        },
        {
            title: "Software Engineer",
            company: "Cloud Wave",
            dates: "July 2022 – April 2024",
            description: `
           - Enhanced an Azure-hosted C# ASP.NET Core application with a React JavaScript frontend.<br>
           - Integrated third-party RESTful APIs in C#.NET Core.<br>
           - Maintained/Designed Python applications on Linux OS with a PostgreSQL backend.<br>
           - Worked collaboratively in an Agile environment using GitHub for version control and code reviews.<br>
           - Developed on a Azure based real-time message processing systems.
        `
        },
        {
            title: "Software Developer",
            company: "The JAAW Group",
            dates: "Sept 2021 – June 2022",
            description: `
           - Developed a Blazor web app with ASP.NET Core, C#, and SQL Server.<br>
           - Created a .NET Core auditing tool to validate software on networked computers.<br>
           - Implemented distributed messaging C# features with RabbitMQ and Redis.<br>
           - Used Git for version control and followed Agile workflows.<br>
           - Worked with Python scripts to automate file server maintenance-related tasks.
        `
        },
        {
            title: "Software Developer",
            company: "SS&C",
            dates: "Nov 2018 – May 2021",
            description: `
           - Enhanced ASP.NET MVC and SQL Server-based application.<br>
           - Built RESTful APIs and backend services in C#.<br>
           - Gained working knowledge of React and JavaScript.<br>
           - Created Python/Selenium end-to-end automation tests.<br>
           - Participated in Agile development cycles.
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
          - Languages:-> C#, Python, JavaScript, SQL, HTML, CSS.<br>
          - Frameworks/Libraries:-> React, Node.js, ASP.NET, Blazor, AngularJS, REST APIs, MVVM, WPF, WinForms.<br>
          - Databases:-> PostgreSQL, SQL Server, Azure Cosmos DB.<br>
          - Cloud/DevOps:-> Azure, Azure DevOps, GitHub Actions, CI/CD.<br>
          - Tools:-> Git, Docker, Jira, Visual Studio, VS Code.<br>
          - Testing/Other:-> Unit Testing, Integration Testing, Test Automation: Selenium, Jest, Cypress.<br>
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