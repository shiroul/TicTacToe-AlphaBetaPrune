import {
    cpuMove,
    changeDiffBot
} from './DumbCPU.js'

let turn = 'X'
let win = 0
let board = Array.from(document.getElementsByClassName('box'))
let toggleSwitch = false
let boardValue = new Array(9).fill(null);

export let winningTurn = [
    [0,1,2], 
    [0,4,8], 
    [0,3,6],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]]

const startGame = () => {
    dumbLabel.style.display = "block";
    smartLabel.style.display = "none";
    cpuMove(boardValue)
    board.forEach(box => box.addEventListener('click', boxClicked))
}

restartButton.addEventListener('click', restart)
toggleInput.addEventListener("change", toggle)

function toggle(){
    if(toggleSwitch){
        dumbLabel.style.display = "block";
        smartLabel.style.display = "none";
        changeDiffBot(0)
        toggleSwitch = !toggleSwitch
        return
    }
    smartLabel.style.display = "block";
    dumbLabel.style.display = "none";
    changeDiffBot(1)
    toggleSwitch = !toggleSwitch
}

function restart() {
    win = 0
    document.getElementById("restartButton").innerHTML = "RESTART";
    document.getElementById("Tictactoe").innerHTML = "Tictactoe";
    for(let i=0;i<9;i++){
        document.getElementById(i).innerHTML = '';
    }
    boardValue = Array(9).fill(null);
    cpuMove(boardValue)
}

export function checkWinning(boardValue, mark){
    for(let i=0;i<8;i++){
        if(boardValue[winningTurn[i][0]] == mark && boardValue[winningTurn[i][1]] == mark && boardValue[winningTurn[i][2]] == mark){
            return 1
        }
    }
    return 0
}

function boxClicked(e) {
    if(win==0){
        const id = e.target.id
        if(!boardValue[id]){
            boardValue[id] = 'X';
            e.target.innerText = 'X';
            if(checkWinning(boardValue, 'X')){
                document.getElementById("Tictactoe").innerHTML = "PLAYER WIN!";
                win = 1
                return
            }
            cpuMove(boardValue)
        }
    } 
}

export function changeWin(){
    win = 1
}
startGame()