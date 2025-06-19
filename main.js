function loadScript(url, callback) {
	const script = document.createElement('script');
	script.src = url;
	script.type = 'text/javascript';
	script.onload = function () {
		console.log(`${url} loaded`);
		if (callback) callback();
	};
	document.head.appendChild(script);
}

function loadPage() {
	const contentDiv = document.getElementById('content');

	fetch('resumeIndeed.html')
		.then(res => res.text())
		.then(html => {
			contentDiv.innerHTML = html;
			window.resumePageInitialized = false;
			// Load the script AFTER HTML is inserted
			const script = document.createElement('script');
			script.src = 'resumeIndeed.js';
			script.onload = () => {
				if (typeof initAboutPage === 'function') {
					initAboutPage(); // Call your function directly
				}
			};
			document.body.appendChild(script);
		});
}

function loadSectionContent(section) {
	const sidebarContent = document.getElementById('sidebar-content');

	switch (section) {
		case 'home':
			sidebarContent.innerHTML = `
  		<section id="home" class="section bg-light text-center py-4 details">
  		<div class="container details">
    	<section class="pt-1">
      	<h2 class="h4 mb-2">Technical Skills</h2>
      	<ul class="text-start d-inline-block mb-0">
        <li><strong>Languages:</strong> C#, Python, JavaScript, SQL, HTML, CSS</li>
        <li><strong>Frameworks/Libraries:</strong> React, Node.js, ASP.NET, Blazor, AngularJS, REST APIs, MVVM, WPF, WinForms</li>
        <li><strong>Databases:</strong> PostgreSQL, SQL Server, Azure Cosmos DB</li>
        <li><strong>Cloud/DevOps:</strong> Azure, Azure DevOps, GitHub Actions, CI/CD</li>
        <li><strong>Tools:</strong> Git, Docker, Jira, Visual Studio, VS Code</li>
        <li><strong>Testing/Other:</strong> Unit Testing, Integration Testing, Test Automation: Selenium, Jest, Cypress</li>
      	</ul>
    	</section>
		  `;
				break;
			case 'projects':
				sidebarContent.innerHTML = `
			<section id="projects" class="section bg-light text-center details">
			  <div class="container details">
				<section id="projects" class="section bg-white text-center py-4">
  				<div class="container">
    			<h2 class="mb-4">GitHub Projects</h2>
    			<div class="row justify-content-center">

      		<div class="col-md-4 col-sm-6 mb-4">
        		<div class="card h-100 shadow-sm" style="max-width: 95%; margin: auto;">
          		<div class="card-body">
            	<h5 class="card-title">ConfigDocker</h5>
            	<p class="card-text">Demonstrates how to configure Docker services by modifying YAML files. Useful for infrastructure setup and DevOps practices.</p>
            	<a href="https://github.com/bobcatapano/ConfigDockerServices" class="btn btn-outline-primary" target="_blank">View on GitHub</a>
          	</div>
        	</div>
      		</div>

      		<div class="col-md-4 col-sm-6 mb-4">
        	<div class="card h-100 shadow-sm" style="max-width: 95%; margin: auto;">
          	<div class="card-body">
            <h5 class="card-title">Automation</h5>
            <p class="card-text">A universal desktop automation tool that records user actions and stores them as XML for later playback. Useful for repetitive task automation.</p>
            <a href="https://github.com/bobcatapano/GhostShadowAutomation" class="btn btn-outline-primary" target="_blank">View on GitHub</a>
          	</div>
        	</div>
      		</div>

      		<div class="col-md-4 col-sm-6 mb-4">
        	<div class="card h-100 shadow-sm" style="max-width: 95%; margin: auto;">
          	<div class="card-body">
            <h5 class="card-title">mauiEncryptiopn</h5>
            <p class="card-text">Encrypts a file on your smart phone and sends the attached file as an email. Written using MAUI.NET</p>
            <a href="https://github.com/bobcatapano/mauiEncroyProject" class="btn btn-outline-primary" target="_blank">View on GitHub</a>
          	</div>
        	</div>
      		</div>

    		</div>
  			</div>
			</section>
		  `;
				break;
			case 'about':
				sidebarContent.innerHTML = `
			<section id="about" class="section bg-light text-center details">
			  <div class="container details">
				 <p><strong>Software Engineer with 5+ years of experience</strong> delivering full-stack web applications, automation frameworks, and cloud-based solutions across defense, healthcare, and financial sectors. Skilled in C#, JavaScript, TypeScript, Python, SQL, HTML, CSS, and Azure.</p>
                 <p><strong>Music has been a constant in my life.</strong> I play both piano and guitar, I like George Winston’s piano compositions and artists such as Johnny Cash and Phish.</p>
                 <p><strong>Outside of music,</strong> some of my favorite movies include <em>This Is Spinal Tap</em>, <em>Weekend at Bernie’s</em>, and <em>The Adventures of Baron Munchausen</em>. The books I enjoy most are <em>The Hobbit</em>, <em>A Connecticut Yankee in King Arthur’s Court</em>, and <em>The Feynman Lectures on Physics</em>.</p>
              </div>
				<br>
			  </div>
			</section>
		  `;
				break;
			case 'experience':
				sidebarContent.innerHTML = `
			<section id="experiecnce" class="section bg-light py-5 text-center details">
  				<div class="container details">
    			<div class="section">

 			<div class="job">
    		<p class="job-title">
      		Insight Global (Contract) — Software Engineer 
    		</p>
			<span class="date">Oct 2024 – Feb 2025</span>
    		<ul>
              <li>Developed dynamic pages using React JavaScript, Node.js, and Express, backed by PostgreSQL.</li>
              <li>Brought prior full-stack perspective (including C#/.NET background) to UI component design, focusing on clarity, reusability, and integration readiness.</li>
              <li>Built automated test suites using Jest (unit) and Cypress (end-to-end).</li>
              <li>Utilized GitLab and participated in Agile sprints with Atlassian Jira.</li>
    		</ul>
  			</div>

  			<div class="job">
    		<p class="job-title">
      		Cloud Wave / Sensato — Software Engineer 
			</p>
			<span class="date">Jul 2022 – Apr 2024</span>
			<ul>
				<li>Delivered full-stack apps using ASP.NET Core and React in a cybersecurity setting.</li>
				<li>Created/maintained Python applications for network monitoring of hospital infrastructure to save hours of manual observation of security risks.</li>
				<li>Worked with cloud-native apps such as Azure Functions and Cosmos DB.</li>
				<li>Integrated external REST APIs and led mentoring efforts for junior developers.</li>
				</ul>
			</div>

			<div class="job">
				<p class="job-title">
				The JAAW Group — Software Developer 
				</p>
				<span class="date">Sep 2021 – Jun 2022</span>
				<ul>
				<li>Built a Blazor web portal with ASP.NET Core and SQL Server to ensure consistent code reviews and time to check other code requirements.</li>
				<li>Wrote Python scripts to automate IT and data tasks to save hours of manual steps.</li>
				<li>Led QA test automation for internal tools to save days of testing time.</li>
				<li>Designed Azure DevOps CI/CD pipelines using YAML.</li>
				</ul>
			</div>

			<div class="job">
				<p class="job-title">
				SS&amp;C Technologies — Software Developer 
				</p>
				<span class="date">Nov 2018 – May 2021</span>
				<ul>
				<li>Contributed to an ASP.NET MVC application using C#, React, and SQL Server.</li>
				<li>Developed RESTful APIs and contributed to modular service architecture.</li>
				<li>Built automated test tools in Python for regression testing to save days of manual testing time.</li>
				<li>Enhanced a C# WPF app by implementing MVVM for better maintainability.</li>
				</ul>
			</div>

			<div class="job">
				<p class="job-title">
				Collabra Solutions (Contract) — Software Developer in Test 
				</p>
				<span class="date">Jan 2018 – Oct 2018</span>
				<ul>
				<li>Created a WinForms-based test automation tool in C# to save days of repetitive manual testing.</li>
				<li>Developed an AngularJS dashboard to visualize testing metrics to show how testing is progressing to management.</li>
				<li>Championed QA automation practices to accelerate test cycles.</li>
				</ul>
			</div>

			<div class="job">
				<p class="job-title">
				Motorola Solutions — Software Engineer in Test 
				</p>
				<span class="date">Sep 2015 – Dec 2017</span>
				<ul>
				<li>Built a C# WPF MVVM application for remote software deployment, cutting delivery time and manual errors.</li>
				<li>Contributed to internal testing tools and automation infrastructure.</li>
				</ul>
			</div>

			</div>

  				</div>
			</section>		
		  `;
				break;

		default:
			sidebarContent.innerHTML = `<p>Section not found.</p>`;
	}
}

function loadDashboardPage() {
	const contentDiv = document.getElementById('content');

	fetch('angularGraph.html')
		.then(res => res.text())
		.then(html => {
			contentDiv.innerHTML = html;

			// Load AngularJS if not already loaded
			if (!window.angularLoaded) {
				const angularScript = document.createElement('script');
				angularScript.src = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js";
				angularScript.onload = () => {
					window.angularLoaded = true;
					loadChartAndApp(); // continue loading chart.js and app.js
				};
				document.body.appendChild(angularScript);
			} else {
				loadChartAndApp();
			}

			function loadChartAndApp() {
				const chartScript = document.createElement('script');
				chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
				chartScript.onload = () => {
					const appScript = document.createElement('script');
					appScript.src = "app.js";
					appScript.onload = () => {
						try {
							const appRoot = contentDiv.querySelector('#dashboard-root');
							if (appRoot) {
								angular.bootstrap(appRoot, ['dashboardApp']);
							} else {
								console.error("dashboard-root not found in loaded HTML.");
							}
						} catch (e) {
							console.error("Angular bootstrap failed:", e);
						}
					};

					document.body.appendChild(appScript);
				};
				document.body.appendChild(chartScript);
			}
		});
}

function loadSidebarPage() {
	const contentDiv = document.getElementById('content');
	contentDiv.innerHTML = `
    <div class="container-fluid">
      <div class="row">
        
        <!-- Sidebar -->
        <!--<nav class="col-md-3 col-lg-2 bg-light sidebar py-4 shadow-sm rounded-end" style="min-height: 100vh;">-->
          <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar py-4 shadow-sm rounded-end">
          <div class="accordion" id="sidebarAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingMain">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMain">
                  Main
                </button>
              </h2>
              <div id="collapseMain" class="accordion-collapse collapse show">
                <div class="accordion-body p-0">
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a class="nav-link" href="#" onclick="loadSectionContent('home')"><i class="bi bi-house-door"></i> Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#" onclick="loadSectionContent('projects')"><i class="bi bi-github"></i> Projects</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingExtra">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExtra">
                  Extra
                </button>
              </h2>
              <div id="collapseExtra" class="accordion-collapse collapse">
                <div class="accordion-body p-0">
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a class="nav-link" href="#" onclick="loadSectionContent('about')"><i class="bi bi-person"></i> About</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#" onclick="loadSectionContent('experience')"><i class="bi bi-briefcase"></i> Experience</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <!-- Main Content Area -->
        <main class="col-md-9 col-lg-10 px-4 pt-4">
          <div id="sidebar-content">
            <h1 class="h2">WebPage based Single Page Application Resume</h1>
            <p class="lead">This is still underconstruction. Click a link on the left.</p>
          </div>
        </main>

      </div>
    </div>
  `;
}



let hasNavigated = false;

function changeContent(page) {
	const contentDiv = document.getElementById('content');
	const generalHome = document.getElementById('general-home');

	// Remove the general home section if this is the first navigation
	if (!hasNavigated) {
		generalHome.style.display = 'none'; // or generalHome.remove();
		hasNavigated = true;
	}

	switch (page) {
		case 'resume':
			loadPage();
			break;

		case 'angular':
			loadDashboardPage();
			break;

		case 'components':
			loadSidebarPage();
			break;
		default:
			contentDiv.innerHTML = `<p>Page not found.</p>`;
	}
}

