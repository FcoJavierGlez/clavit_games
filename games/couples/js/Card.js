class Card {

    constructor(number) {
        this._number = number;
        this._visible = false;
        this._removed = false
    }

    getNumber = function() {
        return this._number;
    }

    getRemoved = function() {
        return this._removed;
    }

    getVisible = function() {
        return this._visible;
    }

}