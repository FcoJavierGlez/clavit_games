/**
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
{   
    const stinksOfApple = userAgent => /\(.*(?<os>(Mac|iPad|iPod|iPhone|iOS)).*\)/i.test(userAgent) || /Version\/.* Safari/.test(userAgent);
    const stinksOfAndroid = userAgent => /\(.*(?<os>(Android)).*\)/i.test(userAgent);

    const createCardGame = infoCard => {
        const CARD     = document.createElement("a");
        const DIV_IMG  = document.createElement("div");
        const DIV_NAME = document.createElement("div");
        const IMG      = document.createElement("img");

        CARD.href = `games/${infoCard.name}/index.html`;
        CARD.classList = 'card-game';

        IMG.src = `img/logo_games/${infoCard.name}_logo.png`;
        IMG.alt = `logo_${infoCard.name}`;

        DIV_IMG.appendChild(IMG);
        DIV_NAME.innerText = infoCard.ui_name;

        CARD.appendChild(DIV_IMG);
        CARD.appendChild(DIV_NAME);

        return CARD;
    }

    const createGamesList = () => {
        const fragment = new DocumentFragment();

        GAMES_LIST.forEach( e => {
            if ( stinksOfApple(navigator.userAgent) ) {
                e.ios ? fragment.appendChild( createCardGame(e) ) : false;
            }
            else if ( stinksOfAndroid(navigator.userAgent) ) {
                e.android ? fragment.appendChild( createCardGame(e) ) : false;
            }
            else fragment.appendChild( createCardGame(e) )
        });
        return fragment;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const GAMES_LIST = document.getElementsByClassName("game-list")[0];
        GAMES_LIST.appendChild(createGamesList());

        const GAMES_CARD = [...document.querySelectorAll(".game-list a")];

        if (!stinksOfApple(navigator.userAgent)) {
            GAMES_CARD.forEach( e => e.addEventListener("click", ev => {
                ev.preventDefault();
                e.addEventListener("animationend", () => location.assign(e.href));
            }));
        }
    });
}
