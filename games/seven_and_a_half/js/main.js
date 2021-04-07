/**
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
{    
    let game;

    /**
     * Crea un Elemento DOM que conformará una de las cartas a renderizar en la UI
     * 
     * @param {Object} card  Objeto literal con la información de la carta: palo, número, etc
     * @param {Number} order La posición dentro de la mano que le corresponde a la carta (renderizar animación IA)
     * @param {Boolean} ia   Determina si esta carta pertenece a la IA para asignarle una animación (por defecto es false)
     * @returns {Element}    Elemento DOM (div) que conforma una carta
     */
    const createCard = (card,order,ia = false) => {
        const divCard = document.createElement("div");
        const divNum  = document.createElement("div");
        const divSuit = document.createElement("div");

        divNum.classList  = card.number > 7 ? `n${card.number}` : `n`;
        divNum.innerText  = card.number > 7 ? '' : card.number;
        divSuit.classList = card.suit;

        divCard.classList = `card`;
        divCard.style.animation = ia && order ? `appearCard 0.5s forwards` : '';
        divCard.appendChild(divNum);
        divCard.appendChild(divSuit);

        return divCard;
    }

    /**
     * Crea las cartas que se mostrarán en la UI
     * 
     * @param {Array} hand Mano con las cartas
     * @param {Boolean} ia Si la mano pertenece a la IA (por defecto es falso)
     * @returns {Array}    El conjunto de elementos DOM destinados a mostrarse en la UI
     */
    const createHand = (hand,ia = false) => {
        const fragment = new DocumentFragment();
        hand.forEach( (card,i) => fragment.appendChild( createCard(card,i,ia) ) );
        return fragment;
    }

    /**
     * Renderiza la puntuación total y los puntos de la mano actual de cada jugador
     * 
     * @param {Array} score         Puntuación total
     * @param {Array} handPoints    Puntos de cada mano
     */
    const renderScore = (score,handPoints) => {
        score[0].innerText = `${game.getScore()}`;
        //score[1].innerText = `${game.getScore(2)}`;
        handPoints[0].innerText = `${game.getHandPoints()}`;
        handPoints[1].innerText = `${game.getHandPoints(2)}`;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const HAND_BANK    = document.getElementById("hand_bank");
        const HAND_PLAYER  = document.getElementById("hand_player");
        const ADD_BUTTON   = document.getElementById("add");
        const STOP_BUTTON  = document.getElementById("stop");
        const SCORES       = [document.getElementById("score_player"),document.getElementById("score_bank")];
        const HAND_POINTS  = [document.getElementById("hand_points_player"),document.getElementById("hand_points_bank")];

        const MESSAGE_BOX  = document.getElementById("box_message");
        const RESTART_TURN = document.getElementById("restart_turn");
        const RESTART_GAME = document.getElementById("restart_game");

        game = new Game();

        /**
         * Reinicia la UI
         */
        const resetUI = () => {
            MESSAGE_BOX.style.display = 'none';
            RESTART_TURN.style.display = 'none';
            RESTART_GAME.style.display = 'none';
            HAND_PLAYER.innerHTML = HAND_BANK.innerHTML = '';
            HAND_BANK.appendChild( createHand(game.getHand(2)) );
            HAND_PLAYER.appendChild( createHand(game.getHand()) );
        }

        /**
         * Muestra el mensaje al final de cada turno
         * 
         * @param {Boolean} playerLose  Si el juegador humano ha perdido
         * @param {Boolean} bankLose    Si el jugador máquina ha perdido
         */
        const showMessageEndTurn = (playerLose,bankLose = false) => {
            let tie = !(playerLose || bankLose);
            MESSAGE_BOX.style.display = 'flex';
            if (tie)
                MESSAGE_BOX.children[0].children[0].innerText = 'Empate';
            else if (bankLose) 
                MESSAGE_BOX.children[0].children[0].innerText = game.getScore(2) ? 'Ganaste esta ronda' : 'Has ganado el juego';
            else
                MESSAGE_BOX.children[0].children[0].innerText = game.getScore() ? 'Perdiste esta ronda' : 'Has perdido el juego';
            game.getScore() == 0 || game.getScore(2) == 0 ? RESTART_GAME.style.display = 'block' : RESTART_TURN.style.display = 'block';
        }

        resetUI();
        renderScore(SCORES,HAND_POINTS);

        ADD_BUTTON.addEventListener("click", () => {
            if (game.getLose() || game.getStick()) return;
            game.requestCard();
            HAND_PLAYER.innerHTML = '';
            HAND_PLAYER.appendChild( createHand(game.getHand()) );
            renderScore(SCORES,HAND_POINTS);
            if (game.getLose(1)) 
                showMessageEndTurn(true);
        });

        STOP_BUTTON.addEventListener("click", () => {
            if (game.getLose() || game.getStick()) return;
            game.stickPlayer();
            game.playIA();
            HAND_BANK.innerHTML = '';
            HAND_BANK.appendChild( createHand(game.getHand(2), true) );
            renderScore(SCORES,HAND_POINTS);
            showMessageEndTurn(game.getLose(1),game.getLose(2));
        });

        RESTART_TURN.addEventListener("click", () => {
            game.resetTurn();
            renderScore(SCORES,HAND_POINTS);
            resetUI();
        });

        RESTART_GAME.addEventListener("click", () => {
            game.resetGame();
            renderScore(SCORES,HAND_POINTS);
            resetUI();
        });

    });
}
