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
 
  <div class="row">
    
    <!-- Sidebar -->
    <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar py-4 shadow-sm rounded-end">
      <div class="accordion" id="sidebarAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingMain">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMain" aria-expanded="true" aria-controls="collapseMain">
              Main
            </button>
          </h2>
          <div id="collapseMain" class="accordion-collapse collapse show" aria-labelledby="headingMain">
            <div class="accordion-body p-0">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#home" onclick="highlight(this)">
                    <i class="bi bi-house-door"></i> Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#projects" onclick="highlight(this)">
                    <i class="bi bi-briefcase"></i> Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingExtra">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExtra" aria-expanded="false" aria-controls="collapseExtra">
              Extra
            </button>
          </h2>
          <div id="collapseExtra" class="accordion-collapse collapse" aria-labelledby="headingExtra">
            <div class="accordion-body p-0">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="#about" onclick="highlight(this)">
                    <i class="bi bi-person"></i> About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#contact" onclick="highlight(this)">
                    <i class="bi bi-envelope"></i> Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content Right Next to Sidebar -->
<main style="flex-grow: 1; padding: 2rem 1.5rem 2rem 1rem; max-width: 960px;">
      <div class="pb-2 mb-3 border-bottom">
        <h1 class="h2">Single Page Section</h1>
        <p class="lead">Still a work in progress!</p>
      </div>

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Reusable Panel</h5>
          <p class="card-text">Content stuff goes here. TO DO..</p>
        </div>
      </div>
    </main>
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
		case 'game':
			contentDiv.innerHTML = `<canvas id="gameCanvas" width="800" height="600"></canvas>`;
			loadScript('game.js', () => {
				if (typeof startGame === 'function') {
					startGame();
				}
			});
			break;
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

