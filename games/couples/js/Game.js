/**
 * @author Francisco Javier González Sabariego
 * 
 * 
 * 
 */

 class Game {
    
    
    constructor(nCouples) {
        this.cards = this._createCouples(nCouples);
        console.log(this.cards);
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



}