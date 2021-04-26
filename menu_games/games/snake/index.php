<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../../css/normalize.css">
    <link rel="stylesheet" href="../../../css/style.css">
    <link rel="stylesheet" href="css/snake.css">
    <script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
  <script src="js/Touch.js"></script>
    <script src="js/Chronometer.js"></script>
    <script src="js/Food.js"></script>
    <script src="js/Snake.js"></script>
    <script src="js/SnakeGame.js"></script>
    <script src="js/main.js"></script>
    <title>Snake</title>
</head>
<body>
    <noscript>
        <h1>Ésta página requiere el uso de JavaScript para su correcto funcionamiento</h1>
    </noscript>
    <div class="game">
        <div class="info">
            <div class="score_info">
                <a href="../../index.php">
                    <div class="back"></div>
                </a>
                <div class="bold">Puntos:</div>
                <div id="score">0</div>
            </div>
            <div class="time_info"></div>
        </div>
        <div class="render_boardgame">
            <div id="boardgame"></div>
        </div>
    </div>
</body>
</html>