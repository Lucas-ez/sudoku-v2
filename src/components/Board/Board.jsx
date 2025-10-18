import './Board.scss'
import { Cell, WinModal } from '..'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSudokuByDifficulty, setErrors } from './../../store/sudokuSlice'
import { buscarCasillaVacia } from '../../sudoku'
import confetti from 'canvas-confetti'

const mapDifficulty = {
  easy: 6,
  normal: 10,
  hard: 12
}

const Board = ({ setTimer }) => {
  const dispatch = useDispatch()
  const { board, solvedBoard, difficulty } = useSelector((state) => state.sudoku)
  const [win, setWin] = useState(false)
  const [localTimer, setLocalTimer] = useState(0)

  useEffect(() => {
    // reinicia la partida (resetear errores y timer)
    setWin(false)
    setTimer(0)
    setLocalTimer(0)
    dispatch(setErrors(0))
    dispatch(fetchSudokuByDifficulty(mapDifficulty[difficulty]))
  }, [difficulty])

  useEffect(() => {
    let interval = null

    if (!win) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
        setLocalTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [win])

  const validarCelda = (i, j, n) => {
    const isValid = solvedBoard[i][j] === n
    const isFullBoard = buscarCasillaVacia(board)[0] === -1

    // Solo verificar victoria si el tablero está lleno
    if (isFullBoard) {
      // Verificar que TODAS las celdas sean correctas
      let todosCorrecto = true
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] !== solvedBoard[row][col]) {
            todosCorrecto = false
            break
          }
        }
        if (!todosCorrecto) break
      }

      if (todosCorrecto) {
        setWin(true)
      }
    }

    return isValid
  }

  useEffect(() => {
    if (win) {
      // Lanzar confeti cuando gane
      const duration = 3000
      const end = Date.now() + duration

      const colors = ['#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffbb00', '#ff00ff']

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        })

        if (Date.now() < end) {
          window.requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [win])

  const handleNewGame = () => {
    setWin(false)
    setTimer(0)
    setLocalTimer(0)
    dispatch(setErrors(0))
    dispatch(fetchSudokuByDifficulty(mapDifficulty[difficulty]))
  }

  return (
    <>
      <WinModal isOpen={win} onClose={handleNewGame} timer={localTimer} />
      <div className='flex flex-column board'>
        {board &&
          board.map((row, i) => (
            <div key={'row' + i} className='flex row'>
              {row.map((cell, j) => (
                <Cell key={'cell' + j} content={cell} coords={[i, j]} validarCelda={validarCelda} />
              ))}
            </div>
          ))}
      </div>
    </>
  )
}

export default Board
