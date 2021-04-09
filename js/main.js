/**
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
{    
    const stinksOfApple = userAgent => /\(.*(?<os>(Mac|iPad|iPod|iPhone|iOS)).*\)/i.test(userAgent) || /Version\/.* Safari/.test(userAgent);

    document.addEventListener("DOMContentLoaded", () => {
        const GAMES_CARD = [...document.querySelectorAll(".game-list a")];

        if (!stinksOfApple(navigator.userAgent)) {
            GAMES_CARD.forEach( e => e.addEventListener("click", ev => {
                ev.preventDefault();
                e.addEventListener("animationend", () => location.assign(e.href));
            }));
        }
    });
}
