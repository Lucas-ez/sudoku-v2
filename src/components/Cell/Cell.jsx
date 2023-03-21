import './Cell.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setFocus, incrementErrors } from './../../store/sudokuSlice'
import { useEffect, useState } from 'react'

const Cell = ({ content, coords, validarCelda }) => {
  const dispatch = useDispatch()
  const { focus } = useSelector(state => state.sudoku)
  const [i, j] = [...coords]
  const [isOK, setIsOK] = useState()
  const isFocused = focus && focus[0] === i && j === focus[1]

  useEffect(() => {
    if (content === 0) {
      return setIsOK(null)
    }

    if (validarCelda(i, j, content)) {
      setIsOK('ok')
    } else {
      setIsOK('error')
      dispatch(incrementErrors())
    }
  }, [content])

  const handleClick = () => {
    if (isOK === 'ok') return // mostrar sombreados todos las celdas con el mismo número

    dispatch(setFocus(coords))
  }

  return (
    <div
      className={`flex flex-center cell ${isOK === 'ok' && 'cell-ok'} ${isOK === 'error' && 'cell-error'} ${isFocused && 'cell-focused'}`}
      onClick={handleClick}
    >
      {content === 0 ? ' ' : content}
    </div>
  )
}

export default Cell
