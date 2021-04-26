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
    <link rel="stylesheet" href="css/sevenandahalf.css">
    <script src="js/Game.js"></script>
    <script src="js/main.js"></script>
    <title>Siete y media</title>
</head>
<body>
    <noscript>
        <h1>Ésta página requiere el uso de JavaScript para su correcto funcionamiento</h1>
    </noscript>
    <div class="game">
        <div id="box_message">
            <div class="message">
                <div></div>
                <div>
                    <button id="restart_turn">Continuar</button>
                    <button id="restart_game">Reiniciar</button>
                </div>
            </div>
        </div>
        <div>
            <div class="info">
                <div class="score_info">
                    <a href="../../index.php">
                        <div class="back"></div>
                    </a>
                    <div class="box_score">
                        <div class="bold">Mano:</div>
                        <div id="hand_points_bank">0</div>
                    </div>
                </div>
            </div>
            <div id="hand_bank"></div>
        </div>
        <div>
            <div class="info">
                <div class="score_info">
                    <!-- <div style="height: 25px; width: 25px;"></div> -->
                    <div class="box_score">
                        <div class="bold">Puntos:</div>
                        <div id="score_player">0</div>
                    </div>
                    <div class="box_score">
                        <div class="bold">Mano:</div>
                        <div id="hand_points_player">0</div>
                    </div>
                </div>
            </div>
            <div id="hand_player"></div>
        </div>
        <div class="buttons">
            <button id="stop"></button>
            <button id="add"></button>
        </div>
    </div>
</body>
</html>