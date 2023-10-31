let turn = 'O'
let win = 0
let board = Array.from(document.getElementsByClassName('box'))
let boardValue = new Array(9).fill(null);
let winningTurn = [
    [0,1,2], 
    [0,4,8], 
    [0,3,6],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]]

const startGame = () => {
    board.forEach(box => box.addEventListener('click', boxClicked))
}

restartButton.addEventListener('click', restart)

function restart() {
    boardValue = Array(9).fill(null);
    board.forEach(element => {
        element.innerText = ''
    });
    turn = 'O'
    win = 0
}

function checkWining(){
    winningTurn.forEach(element => {
        if(boardValue[element[0]] == turn && boardValue[element[1]] == turn && boardValue[element[2]] == turn){
            win = 1;
            return 1
        }
    });
}

function boxClicked(e) {
    if(win==0){
        const id = e.target.id
        if(!boardValue[id]){
            boardValue[id] = turn;
            e.target.innerText = turn;
            if(checkWining() == 1){
                console.log('banana')
            }else{
                console.log('bunana')
            }
            console.log('kontol')
            if(turn == 'O'){
                turn = 'X';
                document.getElementById("playerTurn").innerHTML = turn + ' TURN';
                return
            }
            turn = 'O';
            document.getElementById("playerTurn").innerHTML = turn + ' TURN';
            return
        } 
    }
}

startGame()