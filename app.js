angular.module('dashboardApp', [])
    .controller('DashboardController', function ($scope) {
        const vm = this;

        // Initialize with some test data (3 days ago to today)
        vm.tests = [
            { name: 'LoginTest', status: 'pass', timestamp: new Date(Date.now() - 3*24*3600*1000) },
            { name: 'LoginTest', status: 'fail', timestamp: new Date(Date.now() - 2*24*3600*1000) },
            { name: 'PaymentTest', status: 'pass', timestamp: new Date(Date.now() - 2*24*3600*1000) },
            { name: 'SignupTest', status: 'fail', timestamp: new Date(Date.now() - 1*24*3600*1000) },
            { name: 'LoginTest', status: 'pass', timestamp: new Date(Date.now() - 1*24*3600*1000) },
            { name: 'PaymentTest', status: 'fail', timestamp: new Date() },
            { name: 'SignupTest', status: 'pass', timestamp: new Date() }
        ];

        vm.filterStatus = '';
        vm.startDate = '';
        vm.endDate = '';
        vm.testNameFilter = '';


        // Sort keys
        vm.sortKey = 'timestamp';
        vm.sortReverse = false;

        // Compute unique test names for filter dropdown
        vm.uniqueTestNames = [...new Set(vm.tests.map(t => t.name))];

        vm.init = function () {
            vm.renderCharts();
            vm.statusOptions = [
                { label: 'All', value: '' },
                { label: 'Pass', value: 'pass' },
                { label: 'Fail', value: 'fail' }
            ];

            // Watch filters & sorting to update charts & table
            $scope.$watchGroup([
                () => vm.filterStatus,
                () => vm.startDate,
                () => vm.endDate,
                () => vm.testNameFilter,
                () => vm.sortKey,
                () => vm.sortReverse
            ], vm.renderCharts);
        };

        vm.getFilteredTests = function () {
            return vm.tests.filter(test => {
                const testDate = new Date(test.timestamp);
                const statusMatch = !vm.filterStatus || test.status === vm.filterStatus;
                const startMatch = !vm.startDate || testDate >= new Date(vm.startDate);
                const endMatch = !vm.endDate || testDate <= new Date(vm.endDate);
                const nameMatch = !vm.testNameFilter || test.name === vm.testNameFilter;
                return statusMatch && startMatch && endMatch && nameMatch;
            });
        };

        vm.sortBy = function (key) {
            if (vm.sortKey === key) {
                vm.sortReverse = !vm.sortReverse;
            } else {
                vm.sortKey = key;
                vm.sortReverse = false;
            }
        };

        let pieChart = null;
        let barChart = null;

        vm.renderCharts = function () {
            const filtered = vm.getFilteredTests();

            // Pie chart: Pass vs Fail count
            const passCount = filtered.filter(t => t.status === 'pass').length;
            const failCount = filtered.filter(t => t.status === 'fail').length;

            const pieCtx = document.getElementById('statusChart').getContext('2d');
            if (pieChart) pieChart.destroy();
            pieChart = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Pass', 'Fail'],
                    datasets: [{
                        data: [passCount, failCount],
                        backgroundColor: ['#4CAF50', '#F44336']
                    }]
                },
                options: {
                    responsive: false,
                    plugins: { legend: { position: 'bottom' } }
                }
            });

            // Bar chart: Each test/date, colored by pass/fail
            const barLabels = [];
            const barData = [];
            const barColors = [];

            // Get unique sorted dates (yyyy-MM-dd)
            const sortedDates = [...new Set(filtered.map(t => t.timestamp.toISOString().split('T')[0]))].sort();

            sortedDates.forEach(date => {
                filtered
                    .filter(t => t.timestamp.toISOString().split('T')[0] === date)
                    .forEach(test => {
                        barLabels.push(`${test.name} (${date})`);
                        barData.push(1);
                        barColors.push(test.status === 'pass' ? '#4CAF50' : '#F44336');
                    });
            });

            const barCtx = document.getElementById('barChart').getContext('2d');
            if (barChart) barChart.destroy();
            barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: barLabels,
                    datasets: [{
                        label: 'Test Results',
                        data: barData,
                        backgroundColor: barColors,
                        borderColor: barColors,
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: false,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Test Results per Test and Date' }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 1,
                            ticks: { stepSize: 1, callback: () => '' },
                            grid: { display: false }
                        },
                        x: {
                            ticks: { maxRotation: 90, minRotation: 45 },
                            grid: { display: false }
                        }
                    }
                }
            });
        };

    });
