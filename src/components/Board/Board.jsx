import './Board.scss'
import { Cell } from '..'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSudokuByDifficulty } from './../../store/sudokuSlice'

const Board = () => {
  const dispatch = useDispatch()
  const { board, solvedBoard } = useSelector(state => state.sudoku)

  useEffect(() => {
    dispatch(fetchSudokuByDifficulty(10))
  }, [])

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
