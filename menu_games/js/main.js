/**
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
{   
    async function gameList(callback, elementDOM = undefined) {
        const connect = await fetch(`http://localhost/clavit/api/games_list.php`);
        
        const getInfo = await connect.json();
    
        callback(getInfo, elementDOM);
    }

    async function countTotalAccessesGame(formDOM) {
        const data = new FormData(formDOM);

        await fetch(`http://localhost/clavit/api/accessed_game.php`, {
            method: 'POST',
            body: data
        });
    }

    const stinksOfApple = userAgent => /\(.*(?<os>(Mac|iPad|iPod|iPhone|iOS)).*\)/i.test(userAgent) || /Version\/.* Safari/.test(userAgent);
    const stinksOfAndroid = userAgent => /\(.*(?<os>(Android)).*\)/i.test(userAgent);

    const createCardGame = infoCard => {
        const CARD     = document.createElement("a");
        const DIV_IMG  = document.createElement("div");
        const DIV_NAME = document.createElement("div");
        const IMG      = document.createElement("img");

        CARD.href = `games/${infoCard.name}/index.html`;
        CARD.classList = 'card-game';
        CARD.dataset.gid = `${infoCard.id}`;

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
            if ( stinksOfApple(navigator.userAgent) ) 
                e.ios ? fragment.appendChild( createCardGame(e) ) : false;
            else if ( stinksOfAndroid(navigator.userAgent) ) 
                e.android ? fragment.appendChild( createCardGame(e) ) : false;
            else 
                fragment.appendChild( createCardGame(e) )
        });
        return fragment;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const GAMES_LIST = document.getElementsByClassName("game-list")[0];
        GAMES_LIST.appendChild(createGamesList());

        const GAMES_CARD = [...document.querySelectorAll(".game-list a")];

        const createInputIdGame = id => {
            const INPUT = document.createElement("input");
            INPUT.type = 'hidden';
            INPUT.name = 'gid';
            INPUT.value = id;
            GAMES_LIST.appendChild(INPUT);
        }

        GAMES_CARD.forEach( e => e.addEventListener("click", ev => {
            ev.preventDefault();
            createInputIdGame(e.dataset.gid);
            countTotalAccessesGame( GAMES_LIST );
            stinksOfApple(navigator.userAgent) ? location.assign(e.href) : e.addEventListener("animationend", () => location.assign(e.href));
        }));
    });
}
