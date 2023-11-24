import {
    checkWinning,
    changeWin
} from './Logic.js'

let cpuSmart = 0
let turn = 'O'

export function changeDiffBot(x){
    if(x){
        cpuSmart = 1

        return
    }
    cpuSmart = 0
}

export function cpuMove(boardValue){
    let temp
    if(cpuSmart){
        turn = 'O'
        temp = smartCPU(boardValue)
        boardValue[temp] = turn
        document.getElementById(temp).innerHTML = turn;
    }else{
        while(true){
            temp = Math.floor(Math.random() * 9);
            
            if (!boardValue[temp]){
                boardValue[temp] = turn
                document.getElementById(temp).innerHTML = turn;
                if(checkWinning(boardValue, turn)){
                    document.getElementById("Tictactoe").innerHTML = "CPU WIN!";
                    win = 1
                }
                return
            }
        }
    }
}

export function smartCPU(boardValue){
    let count = 0
    let temp = []
    for(let i=0;i<9;i++){
        if(!boardValue[i]){
            count+=1
            temp.push(i)
        }
    }

    let bestMove = temp[0]
    let bestScore = -Infinity
    let alpha = -Infinity
    let beta = Infinity

    for(let i=0;i<count;i++){
        turn = 'O'
        boardValue[temp[i]] = turn
        let score = alphaBetaPrune(count, 0, boardValue, false, alpha, beta)
        if(score>bestScore){
            bestScore = score
            bestMove = temp[i]
        }
        alpha = Math.max(bestScore, alpha)

        if(alpha>=beta){
            boardValue[temp[i]] = null
            turn = 'O'
            break
        }

        boardValue[temp[i]] = null
    }

    turn = 'O'

    if(bestScore == 10){
        changeWin()
        document.getElementById("Tictactoe").innerHTML = "CPU WON!";
        document.getElementById("restartButton").innerHTML = "TRY AGAIN?";
    }
    return bestMove
}

function alphaBetaPrune(index, depth, boardValue, maximaze, alpha, beta){

    if(checkWinning(boardValue, turn)){
        if(turn == 'O'){
            return 10-depth
        }
        return -10+depth
    }

    if(index==0){
        return 0
    }

    if(maximaze){
        let bestScore = -Infinity
        for(let i=0;i<9;i++){
            if(!boardValue[i]){
                turn ='O'
                boardValue[i] = 'O'
                let score = alphaBetaPrune(index-1, depth+1, boardValue, false, alpha, beta)
                bestScore = Math.max(bestScore, score)
                alpha = Math.max(alpha, bestScore)
                boardValue[i] = null

                if(alpha>=beta){
                    break
                }
            }
        }
        return bestScore
    }
    let bestScore = Infinity
    for(let i=0;i<9;i++){
        if(!boardValue[i]){
            turn = 'X'
            boardValue[i] = 'X'
            let score = alphaBetaPrune(index-1, depth+1, boardValue, true, alpha, beta)
            bestScore = Math.min(bestScore, score)
            beta = Math.min(bestScore, beta)
            boardValue[i] = null

            if(alpha>=beta){
                break
            }
        }
    }
    return bestScore
}