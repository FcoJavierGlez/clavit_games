class Card {

    constructor(number) {
        this._number   = number;
        this._selected = false;
        this._removed  = false
    }

    /**
     * 
     * @returns 
     */
    getNumber = function() {
        return this._number;
    }

    /**
     * 
     * @returns 
     */
    getRemoved = function() {
        return this._removed;
    }

    /**
     * 
     * @returns 
     */
    getSelected = function() {
        return this._selected;
    }

    /**
     * 
     */
    remove = function() {
        this.toggleSelect();
        this._removed = true;
    }

    /**
     * 
     */
    toggleSelect = function() {
        this._selected = !this._selected;
    }

}