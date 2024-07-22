<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "usuario";
$password = "contraseña";
$dbname = "nombre_base_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT temperatura, pulso, fecha FROM datos ORDER BY fecha DESC LIMIT 1";
$result = $conn->query($sql);

$response = array('temperature' => null, 'pulse' => null, 'pulseHistory' => []);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['temperature'] = $row['temperatura'];
    $response['pulse'] = $row['pulso'];

    // Obtener historial de ritmo cardíaco para el gráfico
    $sqlHistory = "SELECT pulso FROM datos ORDER BY fecha DESC LIMIT 10";
    $resultHistory = $conn->query($sqlHistory);
    while ($rowHistory = $resultHistory->fetch_assoc()) {
        $response['pulseHistory'][] = $rowHistory['pulso'];
    }
}

$conn->close();

echo json_encode($response);
?>