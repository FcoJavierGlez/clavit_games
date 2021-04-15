/**
 * @author Francisco Javier González Sabariego
 * 
 * 
 * 
 * 
 */
{
    document.addEventListener("DOMContentLoaded", () => {
        const CARDS = [...document.getElementsByTagName("div")].filter( e => e.id.match(/\d{1,}/) );
        const game = new Game(CARDS.length);

        //console.log(CARDS);

        CARDS.forEach( e => {
            e.addEventListener("click", () => {
                /* game.touch(e.id - 1); */
                //console.log(e.id - 1);
            })
        })
    });
}
