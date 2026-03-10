// Chart.js integration for admin.html
async function loadAnalyticsChart() {
  try {
    const res = await fetch('/api/analytics', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    const data = await res.json();
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Total Users', 'Live Users', 'Recent Activity'],
        datasets: [{
          data: [data.totalUsers, data.liveUsers, data.recentActivity],
          backgroundColor: ['#c8141e', '#e8303a', '#c9a84c']
        }]
      },
      options: { responsive: true }
    });
  } catch (e) {
    console.error('Chart load failed', e);
  }
}
loadAnalyticsChart();
