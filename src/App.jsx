import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  // horizontales
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // verticales
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonales
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  
  const[turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador y false es que hay empate
  const[winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    // si ya tiene algo no actualizaremos la posicion
    if (board[index] || winner) return
    // actualizamos el tablero
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiamos de turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index = {index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner == false
                    ? 'Empate'
                    : 'Ha ganado '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
                
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
              
            </div>
          </section>
        )
      }

    </main>   
  )
}

export default App
