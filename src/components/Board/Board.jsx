import './Board.scss'
import { Cell } from '..'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSudokuByDifficulty, setErrors } from './../../store/sudokuSlice'

const mapDifficulty = {
  easy: 6,
  normal: 10,
  hard: 12
}

const Board = () => {
  const dispatch = useDispatch()
  const { board, solvedBoard, difficulty } = useSelector(state => state.sudoku)

  useEffect(() => {
    // reinicia la partida (resetear errores y timer)
    dispatch(setErrors(0))
    dispatch(fetchSudokuByDifficulty(mapDifficulty[difficulty]))
  }, [difficulty])

  const validarCelda = (i, j, n) => {
    return solvedBoard[i][j] === n // ver si está completo
  }

  return (
    <div className='flex flex-column board'>
      {
        board &&
        board.map((row, i) => (
          <div key={'row' + i} className='flex row'>
            {
              row.map((cell, j) => (
                <Cell
                  key={'cell' + j}
                  content={cell}
                  coords={[i, j]}
                  validarCelda={validarCelda}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Board
