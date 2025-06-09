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

		default:
			contentDiv.innerHTML = `<p>Page not found.</p>`;
	}
}

