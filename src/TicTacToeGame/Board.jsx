import React, {useState} from 'react'
import Square from './Square'

const Board = () => {
    const[state, setState] = useState(Array(9).fill(null));
    const[isXTurn, setIsXTurn] = useState(true);

    const checkWinner = () => {
        const winnerLogic = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        for(let logic of winnerLogic) {
            const [a,b,c] = logic;
            if(state[a]!=null && state[a] === state[b] && state[b] === state[c]) {
                return state[a];
            }
        }
        return false;
    }
    const isWinner = checkWinner();

    const handleClick = (index) => {
        if(state[index]!==null || isWinner) {
            return;
        }
        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O";
        setState(copyState);
        setIsXTurn(!isXTurn);
    }

    const handleReset = () => {
        setState(Array(9).fill(null))
        setIsXTurn(true);
    }

    // ✅ Detect draw (when all cells filled & no winner)
    const isDraw = !isWinner && state.every(cell => cell !== null);

  return (
    <div className='board-wrapper'>
      <h1 className="title">Tic Tac Toe</h1>

      <div className='board-container'>
        {isWinner ? (
          <>
            <h2 className="status">🎉 Winner is <span>{isWinner}</span></h2>
            <button className="reset-btn" onClick={handleReset}>Play Again</button>
          </>
        ) : isDraw ? (
          <>
            <h2 className="status">😅 It's a Draw!</h2>
            <button className="reset-btn" onClick={handleReset}>Play Again</button>
          </>
        ) : (
          <> 
            <h3 className="status">Player <span>{isXTurn ? "X" : "O"}</span>, please play</h3>
            <div className='board-row'>
                <Square onClick={() => handleClick(0)} value={state[0]}/>
                <Square onClick={() => handleClick(1)} value={state[1]}/>
                <Square onClick={() => handleClick(2)} value={state[2]}/>
            </div>
            <div className='board-row'>
                <Square onClick={() => handleClick(3)} value={state[3]}/>
                <Square onClick={() => handleClick(4)} value={state[4]}/>
                <Square onClick={() => handleClick(5)} value={state[5]}/>
            </div>
            <div className='board-row'>
                <Square onClick={() => handleClick(6)} value={state[6]}/>
                <Square onClick={() => handleClick(7)} value={state[7]}/>
                <Square onClick={() => handleClick(8)} value={state[8]}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
