import './Board.scss'
import { useEffect, useState } from 'react'
import { generarSudoku } from './../../sudoku'
import { Cell } from '..'

const Board = () => {
  const [board, setBoard] = useState()
  const [focus, setFocus] = useState()

  useEffect(() => {
    setBoard(generarSudoku(2))

    window.addEventListener('keydown', async (e) => {
      // const auxBoard = [...board]
      test()
      console.log(e.key, focus)
    })
  }, [])

  const test = () => {
    console.log(focus)
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
                  setFocus={setFocus}
                  focus={focus}
                  coords={[i, j]}
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
