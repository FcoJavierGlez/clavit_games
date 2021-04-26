<?php
    session_start();

    if ( !isset($_SESSION['uid']) ) 
        $_SESSION['uid'] = isset( $_POST['uid'] ) ? $_POST['uid'] : '0'; //ID pruebas: 1A34F

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Menu</title>
</head>
<body>
    <noscript>
        <h1>Ésta página requiere el uso de JavaScript para su correcto funcionamiento</h1>
    </noscript>
    <div class="menu">
        <a href="./clue/index.php" class="main_menu-option">PISTA</a>
        <a href="./menu_games/index.php" class="main_menu-option">JUEGOS</a>
        <a href="./rrss/index.php" class="main_menu-option">RRSS</a>
    </div>
</body>
</html>