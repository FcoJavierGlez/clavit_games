/**
 * 
 * 
 * @author Francisco Javier González Sabariego
 */
{
    const BOARDGAME_LENGTH = {
        'height': 12,
        'width': 10
    };

    const normalizeCodeKey = codeKey => codeKey.match(/^Arrow(Up|Down|Left|Right)$/i)?.[1].toLowerCase();

    const createBoardGame = () => {
        const fragment = new DocumentFragment();
        let boardGame  = [];
        for (let i = 0; i < BOARDGAME_LENGTH.height; i++) {
            boardGame.push([]);
            for (let j = 0; j < BOARDGAME_LENGTH.width; j++) {
                let square = document.createElement("div");
                square.classList = `square empty`;
                boardGame[i].push(square);
                fragment.appendChild(square);
            }
        }
        return [boardGame,fragment];
    }
    
    /* const createCrono = time => {
        try {
            let crono = new Chronometer(time);
            return crono;
        } catch (error) {
            console.error(`Chronometer no pudo ser creado`);
        }
    } */

    //const printTimer = (display,crono) => display.innerHTML = crono == undefined ? '00:00:00' : crono.getTime();
    const printScore = (display,game) => display.innerHTML = game.getScore(true);
    
    document.addEventListener("DOMContentLoaded", () => {
        const DRAG_ELEMENTS        = [...document.getElementsByTagName("div")].filter( e => e.id.match(/zone_(up|down|left|right)/));
        const CONTROL_PANEL        = document.getElementsByClassName("drag_panel")[0];
        const elementsBoardGame    = document.getElementById("boardgame");
        const score                = document.getElementById("score");
        const [boardGame,fragment] = createBoardGame();
        const snake                = new SnakeGame(boardGame, localStorage.getItem('snake_max_score')); //Cookies
        let idRenderUI             = 0;
        /* const time                 = document.getElementById("time");
        let crono                  = createCrono(0); */

        const COLORS = ['red','yellow','green','blue'];

        const newColor = currentColor => {
            let color;
            do {
                color = COLORS[parseInt(Math.random() * COLORS.length)];
            } while (currentColor == color);
            return color;
        }

        /* console.log(DRAG_ELEMENTS);
        DRAG_ELEMENTS.forEach( e => {
            if (snake.getStatusGame() !== '') return;
            e.addEventListener("dragstart", () => {
                e.style.backgroundColor = `${newColor(e.style.backgroundColor)}`;
            });
            //e.addEventListener("dragover", () => snake.setDirection( e.id ));
            //e.addEventListener("mouseenter", () => e.style.backgroundColor = 'red');
        }); */

        console.log(CONTROL_PANEL);
        CONTROL_PANEL.ondrag = (e) => {
            const div = e.target.closest('div');
            console.log(div.id);
        }
        
        elementsBoardGame.appendChild(fragment);

        printScore(score,snake);
        //printTimer(time,crono);

        const stopRenderUI = () => clearInterval(idRenderUI);

        const renderUI = () => setInterval( 
            () => {
                if (snake.getStatusGame() !== '') {
                    localStorage.removeItem('snake_max_score');                     //Update cookies
                    localStorage.setItem('snake_max_score',snake.getMaxScore());    //Update cookies
                    printScore(score,snake);
                    snake.resetGame();
                    /* stopRenderUI();
                    return; */
                }
                printScore(score,snake);
                //printTimer(time,crono);
            }, 250);

        idRenderUI = renderUI();
        
        document.addEventListener('keydown', e => {
            if (snake.getStatusGame() !== '') return;
            if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") 
                snake.setDirection( normalizeCodeKey(e.code) );
            else if (e.code === "Space" || e.code === "KeyP" || e.code === "Pause") {
                snake.togglePause();
                //crono.togglePause();
                //!snake.getPaused() ? (idRenderUI = renderUI()) : stopRenderUI();
            }
        });

        /* document.addEventListener("click", e => {
            if (snake.getStatusGame() !== '') return;
            if (e.pageY < innerHeight * 0.3 || e.pageY > innerHeight * 0.7) 
                e.pageY < innerHeight * 0.3 ? snake.setDirection( "up" ) : snake.setDirection( "down" );
            else
                e.pageX < innerWidth * 0.5 ? snake.setDirection( "left" ) : snake.setDirection( "right" );
        }); */
    });
}
