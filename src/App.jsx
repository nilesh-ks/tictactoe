import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helpers';

import './styles/root.scss';

const NEW_GAME = [
  {board: Array(9).fill(null), isXNext: true},
];

const App = () => {
  const [history, setHistory] = useState([ 
    {board: Array(9).fill(null), isXNext: true}, 
  ]);
  //const [isNext, setIsNext] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  //console.log('history', history);

  const {winner, winningSquares} = calculateWinner(current.board);

  // const message = winner 
  // ? `Winner is ${winner}` 
  // :  `Next player is ${current.isXNext ? 'X' : 'O'}`;

  console.log(winner);

  const handleSquareClick = position => {
    if(current.board[position] || winner) 
        return;


    setHistory(prev => {
      const last = prev[prev.length-1]; //yields the last element in the previous array

      const newBoard = last.board.map((square, pos) => {
        if(pos === position)
          return last.isXNext? 'X' : 'O';

        return square;

        });

        return prev.concat( {board: newBoard, isXNext: !last.isXNext });
      });

      //setIsNext(prev => !prev);
      setCurrentMove(prev => prev + 1); //update currentMove to let the game run
    };

    const moveTo = move => {
      setCurrentMove(move);
    };

    const onNewGame = () => {
      setHistory(NEW_GAME);
      setCurrentMove(0);
    }

return(
  <div className='app'>
    <h1>TIC TAC TOE</h1>
    <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares}/>
    <StatusMessage winner={winner} current={current}/>
    <button type='button' onClick={onNewGame}>Start New Game</button>
    <History history={history} moveTo={moveTo} currentMove={currentMove}/>
  </div>
)};

export default App;
