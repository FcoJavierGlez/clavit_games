/**
 * @author Francisco Javier González Sabariego
 * 
 * Menu de juegos. La lista de juegos se genera a partir de una petición a la API de la App.
 */
{   
    /**
     * Genera la lista de juegos haciendo una petición a la API
     * 
     * @param {Function} callback   Función que insertará los nuevos elementos DOM dentro del elemento del árbol DOM pasado por parámetro
     * @param {Element} elementDOM  Elemento del árbol DOM dónde se realizará la inserción de las tarjetas de juego
     */
    async function gameList(callback, elementDOM = undefined) {
        const connect = await fetch(`http://localhost/clavit/api/games_list.php`);
        
        const getInfo = await connect.json();
    
        callback(getInfo, elementDOM);
    }

    /**
     * Envía a la API información con el id del usuario y del juego seleccionado
     * 
     * @param {Element} formDOM Elemento formulario dónde están insertadas las tarjetas de juegos
     */
    async function countTotalAccessesGame(formDOM) {
        const data = new FormData(formDOM);

        await fetch(`http://localhost/clavit/api/accessed_game.php`, {
            method: 'POST',
            body: data
        });
    }

    /**
     * Determina si el dispositivo es de fabricación de Apple o se usa el navegador Safari
     * 
     * @param {String} userAgent Valor del atributo userAgent del objeto Navigator
     * @returns {Boolean}        True si el SO es propiedad de Apple o si se usa el navegador Safari
     */
    const stinksOfApple = userAgent => /\(.*(?<os>(Mac|iPad|iPod|iPhone|iOS)).*\)/i.test(userAgent) || /Version\/.* Safari/.test(userAgent);
    
    /**
     * Determina si el SO es Android
     * 
     * @param {String} userAgent Valor del atributo userAgent del objeto Navigator
     * @returns {Boolean}        True si el SO es Android
     */
    const stinksOfAndroid = userAgent => /\(.*(?<os>(Android)).*\)/i.test(userAgent);

    /**
     * Crea una tarjeta de juego d ela lista de juegos
     * 
     * @param {Object} infoCard Objeto literal con la información del juego: nombre, logo, etc
     * @returns {Element}       Elemento del árbol DOM (enlace) con la información del juego
     */
    const createCardGame = infoCard => {
        const CARD     = document.createElement("a");
        const DIV_IMG  = document.createElement("div");
        const DIV_NAME = document.createElement("div");
        const IMG      = document.createElement("img");

        CARD.href = `games/${infoCard.name}/index.php`;
        CARD.classList = 'card-game';
        CARD.dataset.gid = `${infoCard.id}`;

        IMG.src = `img/logo_games/${infoCard.name}_logo.png`;
        IMG.alt = `logo_${infoCard.name}`;

        DIV_IMG.appendChild(IMG);
        DIV_NAME.innerText = infoCard.ui_name;

        CARD.appendChild(DIV_IMG);
        CARD.appendChild(DIV_NAME);

        return CARD;
    }

    /**
     * Añade comportamiento a cada una de las tarjetas de juego d ela lista de juego.
     * 
     * Al hacer click envía información a la BBDD y, si el navegador NO es Safari, realizará
     * una breve animación antes de introducir al usuario en el juego.
     * 
     * @param {Element} cardList Lista de juegos (formulario)
     */
    const addEventClickForEachCard = cardList => {
        const GAMES_CARD = [...document.querySelectorAll(".game-list a")];

        const createInputIdGame = id => {
            const INPUT = document.createElement("input");
            INPUT.type = 'hidden';
            INPUT.name = 'gid';
            INPUT.value = id;
            cardList.appendChild(INPUT);
        }

        GAMES_CARD.forEach( e => e.addEventListener("click", ev => {
            ev.preventDefault();
            createInputIdGame(e.dataset.gid);
            countTotalAccessesGame( cardList );
            stinksOfApple(navigator.userAgent) ? location.assign(e.href) : e.addEventListener("animationend", () => location.assign(e.href));
        }));
    }

    /**
     * Crea la lista de juegos con la información de la lista sacada de la BBDD.
     * 
     * @param {Array} list   Array con la lista de juegos.
     * @param {*} elementDOM Formulario donde se van a insertar los juegos de la lista.
     */
    const createGamesList = (list,elementDOM) => {
        const fragment = new DocumentFragment();

        list = !list.length ? GAMES_LIST : list;

        list.forEach( e => {
            if ( stinksOfApple(navigator.userAgent) ) 
                e.ios ? fragment.appendChild( createCardGame(e) ) : false;
            else if ( stinksOfAndroid(navigator.userAgent) ) 
                e.android ? fragment.appendChild( createCardGame(e) ) : false;
            else 
                fragment.appendChild( createCardGame(e) );
        });
        elementDOM.appendChild(fragment);

        addEventClickForEachCard(elementDOM);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const GAMES_LIST = document.getElementsByClassName("game-list")[0];
        gameList(createGamesList, GAMES_LIST);
    });
}
