/**
 * @author Francisco Javier González Sabariego
 * 
 * 
 * 
 * 
 */
{
    document.addEventListener("DOMContentLoaded", () => {
        const CARDS   = [...document.getElementsByTagName("div")].filter( e => e.id.match(/\d{1,}/) );
        const GAME    = new Game(CARDS.length);
        const MESSAGE = document.getElementById("box_message");
        const RESTART = document.getElementById("restart");
        let idRender = 0;

        const render = () => {
            const gameCards = GAME.getCards();
            idRender = setInterval(
                () => {
                    CARDS.forEach( (e,i) => {
                        e.classList = gameCards[i].getRemoved() ? "card-hidden" : 
                                        gameCards[i].getSelected() ? `c${gameCards[i].getNumber()}` : "card";
                    });
                    if (GAME.getEndGame()) MESSAGE.classList = 'box_message';
                },
            250);
        }

        render();

        RESTART.addEventListener("click", () => {
            GAME.resetGame();
            MESSAGE.classList = 'box_message_hidden';
            clearInterval(idRender);
            render();
        });

        CARDS.forEach( e => {
            e.addEventListener("click", () => {
                GAME.selectCard(e.id - 1);
            })
        })
    });
}
