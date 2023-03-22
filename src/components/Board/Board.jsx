import './Board.scss'
import { Cell } from '..'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSudokuByDifficulty, setErrors, setFocus } from './../../store/sudokuSlice'
import { buscarCasillaVacia } from '../../sudoku'

const mapDifficulty = {
  easy: 6,
  normal: 10,
  hard: 12
}

const Board = ({ setTimer }) => {
  const dispatch = useDispatch()
  const { board, solvedBoard, difficulty } = useSelector(state => state.sudoku)
  const [win, setWin] = useState(false)

  useEffect(() => {
    // reinicia la partida (resetear errores y timer)
    setWin(false)
    setTimer(0)
    dispatch(setErrors(0))
    dispatch(fetchSudokuByDifficulty(mapDifficulty[difficulty]))
  }, [difficulty])

  useEffect(() => {
    let interval = null

    if (!win) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [win])

  const validarCelda = (i, j, n) => {
    const isValid = solvedBoard[i][j] === n
    const isFullBoard = buscarCasillaVacia(board)[0] === -1
    if (isValid && isFullBoard) setWin(true)
    return isValid
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
