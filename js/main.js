/**
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
{    
    document.addEventListener("DOMContentLoaded", () => {
        const GAMES_CARD = [...document.querySelectorAll(".game-list a")];

        GAMES_CARD.forEach( e => e.addEventListener("click", ev => {
            ev.preventDefault();
            e.addEventListener("animationend", () => location.assign(e.href));
        }));
    });
}
