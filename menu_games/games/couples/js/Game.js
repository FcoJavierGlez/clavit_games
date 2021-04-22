/**
 * @author Francisco Javier González Sabariego
 * 
 * 
 * 
 */

 class Game {
    
    constructor(nCouples) {
        this._cards = this._createCouples(nCouples);
        this._cardsSelected = [];
        this._idTimeLapse = 0;
        this._endGame = false;
    }

    _createCouples = function(nCouples) {
        if (nCouples % 2 || nCouples < 6) return;
        let n;
        let arrayCards = [];
        for (let i = 0; i < nCouples; i++) {
            do {
                n = parseInt( Math.random() * ( nCouples / 2 ) + 1 );
            } while (arrayCards.filter( e => e.getNumber() == n ).length == 2);
            arrayCards.push(new Card(n));
        }
        return arrayCards;
    }

    getCards = function() {
        return this._cards;
    }

    getEndGame = function() {
        return this._endGame;
    }

    resetGame = function() {
        this._cards = this._createCouples(this._cards.length);
        this._cardsSelected = [];
        this._idTimeLapse = 0;
        this._endGame = false;
        console.log('reset');
        console.log(this._cards);
    }

    /**
     * 
     * @param {Number} id 
     */
    selectCard = function(id) {
        if (this._endGame || this._cardsSelected.length == 2 || this._cards[id].getSelected() || this._cards[id].getRemoved()) return;
        this._cards[id].toggleSelect();
        this._cardsSelected.push( this._cards[id] );
        if (this._cardsSelected.length == 2)
            this._resolution();
    }

    _resolution = function() {
        const game = this;
        this._idTimeLapse = setInterval( 
            () => {
                if (game._cardsSelected[0].getNumber() == game._cardsSelected[1].getNumber()) {
                    game._cardsSelected[0].remove();
                    game._cardsSelected[1].remove();
                } else {
                    game._cardsSelected[0].toggleSelect();
                    game._cardsSelected[1].toggleSelect();
                }
                game._cardsSelected = [];
                clearInterval(game._idTimeLapse);
                game._idTimeLapse = 0;
                this._endGame = this._cards.length == this._cards.filter( e => e.getRemoved() ).length;
            },
        1000);
    }

}