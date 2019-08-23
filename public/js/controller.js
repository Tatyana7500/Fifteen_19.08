import { Gamer } from "./model.js";

function Game(context, cellSize){
    let arr = [
        [1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,0]
    ];
    let clicks = 0;

    function cellView(x, y){
        context.fillStyle = "#f2caff";
        context.fillRect(x+1, y+1, cellSize-2, cellSize-2);
    }

    function numView(){
        context.font = "bold "+(cellSize/2)+"px Sans";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#222";
    }

    function zeroView(x, y){
        context.fillStyle = "#222";
        context.fillRect(x+1, y+1, cellSize-2, cellSize-2);
    }

    this.getNullCell = function(){
        for (let i = 0; i<4; i++){
            for (let j=0; j<4; j++){

                if(arr[j][i] === 0){

                    return {'x': i, 'y': j};
                }
            }
        }
    };

    this.draw = function() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                if (arr[i][j] > 0) {
                    cellView(j * cellSize, i * cellSize);
                    numView();
                    context.fillText(arr[i][j], j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
                } else {
                    zeroView(j * cellSize, i * cellSize);
                }
            }
        }
    };

    this.move = function(x, y) {
        let nullX = this.getNullCell().x;
        let nullY = this.getNullCell().y;

        if (((x - 1 == nullX || x + 1 == nullX) && y == nullY) || ((y - 1 == nullY || y + 1 == nullY) && x == nullX)) {
            arr[nullY][nullX] = arr[y][x];
            arr[y][x] = 0;
            clicks++;
        }
    };

    this.victory = function() {
        let e = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
        let res = true;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                if (e[i][j] != arr[i][j]) {
                    res = false;
                }
            }
        }

        return res;
    };

    function getRandomBool() {
        if (Math.floor(Math.random() * 2) === 0) {

            return true;
        }
    }

    this.mix = function(stepCount) {
        let x,y;
        for (let i = 0; i < stepCount; i++) {
            let nullX = this.getNullCell().x;
            let nullY = this.getNullCell().y;
            let hMove = getRandomBool();
            let upLeft = getRandomBool();
            if (!hMove && !upLeft) { y = nullY; x = nullX - 1;}
            if (hMove && !upLeft)  { x = nullX; y = nullY + 1;}
            if (!hMove && upLeft)  { y = nullY; x = nullX + 1;}
            if (hMove && upLeft)   { x = nullX; y = nullY - 1;}
            if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
                this.move(x, y);
            }
        }
        clicks = 0;
    };

    this.getClicks = function() {

        return clicks;
    };

    //получаю массив из функции загрузки сохранения и подменяю им текущий массив и заново перерисовываю канвас
    this.arrayRestore = function(newArray) {
        arr = newArray;
    };

    //беру текущий массив и передаю его в функцию сохранения
    this.saveArray = function () {
        return arr;
    };
}


const init = () => {
    let canvas = document.getElementById("canvas");
    canvas.width  = 320;
    canvas.height = 320;
    let cellSize = canvas.width / 4;
    let context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);

    let game = new Game(context, cellSize);
    game.mix(300);
    game.draw();

    canvas.onclick = function(e) {
        let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
        let y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
        event(x, y);
    };

    canvas.ontouchend = function(e) {
        let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
        let y = (e.touches[0].pageY - canvas.offsetTop)  / cellSize | 0;
        event(x, y);
    };

    function event(x, y) {
        game.move(x, y);
        context.fillRect(0, 0, canvas.width, canvas.height);
        game.draw();
        if (game.victory()) {
            alert("Собрано за "+game.getClicks()+" касание!");
            game.mix(300);
            context.fillRect(0, 0, canvas.width, canvas.height);
            game.draw(context, cellSize);
        }
    }

    //функция создания новой игры, почему-то не отображается пустая клетка, появляется только после того как клацнуть на канвас
    //на то место где должна быть пустая клетка, дублируется другое рандомное число
    const newGameFunc = () => {
        game.mix(300);
        game.draw();
    };

    //функция получаем имя из поля ввода
    const getUserName = () => {
        return document.getElementById('Name').value;
    };

    //функция загрузки сохранения, пока что передаю объект таким образом, потом будет из модели
    const loadGameFunc = () => {
        let userName = getUserName();

        if (userName !== '') {
            let gamer = new Gamer();
            gamer.setGamer(userName);
            gamer = gamer.getFileGamers();

            if (gamer) {
                game.arrayRestore(gamer.fifteenArray); //загружаю массив обратно и заменяю им исходный
                game.draw(); //вновь отрисовываю канвас
            }else{
                alert('Сохраненной игры с таким именем нет!');
            }
        } else {
            alert("Введите имя, чтобы загрузить Вашу игру!");
        }
    };

    //функция сохренения текущего состояния игры
    const saveGameFunc = () => {
        let userName = getUserName();

        if (userName !== '') {
            const gamer = new Gamer();
            gamer.setGamer(userName, game.saveArray());
            gamer.setFileGamers();
            alert("Вы успешно сохранились!");
        } else {
            alert("Введите Ваше имя, чтобы сохранить игру!");
        }
    };

    //слушатели на кнопки
    const newGame = document.getElementById('newGame');
    const loadGame = document.getElementById('openGame');
    const saveGame = document.getElementById('saveGame');

    newGame.addEventListener('click', newGameFunc, false);
    loadGame.addEventListener('click', loadGameFunc, false);
    saveGame.addEventListener('click', saveGameFunc, false);
};

init();
