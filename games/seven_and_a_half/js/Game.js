/**
 * Juego de la siete y media
 * 
 * Similar al Black Jack pero con 7 puntos y medio.
 * 
 * Las figuras (sota, caballo y rey) valen medio punto, los números valen su propio valor en puntos.
 * 
 * El jugador juega contra la banca. Pide cartas para obtener una puntuación de mano lo más cercana
 * a los 7 puntos y medio, si se sobrepasa pierde. Si se planta con <=7.5 puntos juega la banca, 
 * en caso de que la banca sobrepas los 7.5 puntos el jugador gana, de lo contrario, gana el que más 
 * puntos tenga si haber sobrepasado los 7.5 puntos.
 * 
 * El perdedor cede 10 de sus puntos (score) al ganador. En caso de empate la puntuación no se altera.
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
const Game = class {
    _cards = [];

    _player1 = {
        'hand': [],
        'stick': false,
        'score': 200,
        'lose': false,
    };
    _player2 = {
        'hand': [],
        'stick': false,
        'score': 200,
        'lose': false,
    };

    constructor() {
        this._cards = this._createCards();
        this.requestCard(1);
        this.requestCard(2);
    }

    /**
     * Crea una baraja baraja española compuesta por 40 cartas, 4 palos con 7 números y 3 figuras por palo.
     */
    _createCards = function () {
        const suits = ['clubs','coins','cups','swords'];
        let cards = [];

        suits.forEach( e => {
            for (let i = 1; i < 11; i++) { 
                cards.push(
                    {
                        'suit': e,
                        'number': i,
                        'value': i > 7 ? 0.5 : i,
                        'used': false
                    }
                )
            }
        });
        return cards;
    }

    /**
     * El total de puntos que vale la mano del jugador pasado por parámetro
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano)
     * @returns {Number} Total de puntos
     */
    getHandPoints = function(numberPlayer = 1) {
        return numberPlayer == 1 ? 
            this._player1.hand.map( e => e.value ).reduce( (add,e) => add + e ) : 
            this._player2.hand.map( e => e.value ).reduce( (add,e) => add + e );
    }

    /**
     * Devuelve el conjunto de cartas que componen la mano del jugador determinado por
     * el párametro.
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano)
     * @returns {Array} Mano del jugador
     */
    getHand = function(numberPlayer = 1) {
        return numberPlayer == 1 ? this._player1.hand : this._player2.hand;
    }

    /**
     * Determina si el jugador ha perdido
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano). Por defecto vale 1 (jugador humano)
     * @returns {Boolean} True si ha perdido el jugador, de lo contrario false.
     */
    getLose = function(numberPlayer = 1) {
        return numberPlayer == 1 ? this._player1.lose : this._player2.lose;
    }

    /**
     * Devuelve la puntuación acumulada por el jugador
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano)
     * @returns {Number} Puntuación del jugador.
     */
     getScore = function(numberPlayer = 1) {
        return numberPlayer == 1 ? this._player1.score : this._player2.score;
    }

    /**
     * Determina si el jugador se ha plantado
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano)
     * @returns {Boolean} True si el jugador se ha plantado
     */
     getStick = function(numberPlayer = 1) {
        return numberPlayer == 1 ? this._player1.stick : this._player2.stick;
    }

    /**
     * Planta al jugador determinado por el párametro.
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano)
     */
     stickPlayer = function(numberPlayer = 1) {
        numberPlayer == 1 ? this._player1.stick = true : this._player2.stick = true;
    }

    /**
     * Reinicia el turno de juego
     */
    resetTurn = function() {
        this._player1.hand = [];
        this._player2.hand = [];
        this._player1.stick = this._player2.stick = false;
        this._player1.lose = this._player2.lose = false;
        this._cards.forEach( e => e.used = false);
        this.requestCard(1);
        this.requestCard(2);
    }

    /**
     * Reinicia el juego
     */
    resetGame = function() {
        this.resetTurn();
        this._player1.score = this._player2.score = 200;
    }

    /**
     * Reasigna los puntos a cada jugador según ganen o pierdan.
     */
    _reassingScore = function() {
        if (!(this._player1.lose || this._player2.lose)) return;
        this._player1.score += this._player2.lose ? 10 : -10;
        this._player2.score += this._player1.lose ? 10 : -10;
    }

    /**
     * Pide una nueva carta (jugador humano por defecto)
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano)
     */
    requestCard = function(numberPlayer = 1) {
        let random;
        let player = numberPlayer == 1 ? this._player1 : this._player2;

        if (numberPlayer == 1 ? this._player1.stick || this._player1.lose : this._player2.stick || this._player2.lose) return;

        do {
            random = parseInt( Math.random() * 40 );
        } while (this._cards[random].used);

        this._cards[random].used = true;

        player.hand.push( this._cards[random] );
        player.lose = this.getHandPoints(numberPlayer) > 7.5;

        if (this._player1.lose) 
            this._reassingScore();
    }

    /**
     * Planta al jugador determinado por el párametro.
     * 1 = jugadorhumano
     * 2 = jugador máquina
     * 
     * @param {Number} numberPlayer Numero del jugador. Por defecto vale 1 (jugador humano)
     */
    stickSelf = function(numberPlayer = 1) {
        numberPlayer == 1 ? this._player1.stick = true : this._player2.stick = true;
    }

    /**
     * Turno de juego de la IA
     */
    playIA = function() {   
        let pointsPlayer1 = this.getHandPoints();

        if (this.getHandPoints(2) >= pointsPlayer1) {
            this._player1.lose = this.getHandPoints(2) > pointsPlayer1;
            this._reassingScore();
            return;
        }

        do {
            this.requestCard(2);
        } while (this.getHandPoints(2) < pointsPlayer1);

        this._player1.lose = this.getHandPoints(2) > pointsPlayer1 && !this._player2.lose;
        this._reassingScore();
    }

}