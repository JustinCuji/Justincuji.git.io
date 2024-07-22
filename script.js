document.addEventListener("DOMContentLoaded", function() {
    function fetchData() {
        fetch('get_data.php')
            .then(response => response.json())
            .then(data => {
                document.getElementById('tempValue').textContent = Temperatura: ${data.temperature} °C;
                document.getElementById('pulseValue').textContent = Ritmo Cardíaco: ${data.pulse} bpm;
                updateChart(data.pulseHistory);
            })
            .catch(error => console.error('Error:', error));
    }

    function updateChart(pulseHistory) {
        const ctx = document.getElementById('pulseChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: pulseHistory.map((_, index) => index + 1),
                datasets: [{
                    label: 'Ritmo Cardíaco',
                    data: pulseHistory,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    setInterval(fetchData, 5000); // Actualiza cada 5 segundos
});