<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="../css/style.css">
    <script src="js/constants.js"></script>
    <script src="js/main.js"></script>
    <title>Games</title>
</head>
<body>
    <noscript>
        <h1>Ésta página requiere el uso de JavaScript para su correcto funcionamiento</h1>
    </noscript>
    <div class="game">
        <div class="upper-panel">
            <a href="../index.php">
                <div class="back"></div>
            </a>
            <div>JUEGOS</div>
            <div></div>
        </div>
        <form class="game-list">
            <input type="hidden" name="uid" value="<?php echo $_SESSION['uid']; ?>">
        </form>
    </div>
</body>
</html>