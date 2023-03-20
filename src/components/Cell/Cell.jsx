import './Cell.scss'

const Cell = ({ content, setFocus, focus, coords }) => {
  // Si es distinto de 0 y cumple determinada condición
  const isOK = content !== 0
  const isFocused = focus && focus[0] === coords[0] && coords[1] === focus[1]

  const handleClick = () => {
    if (isOK) return

    setFocus(coords)
  }

  return (
    <div
      className={`flex flex-center cell ${isOK && 'cell-ok'} ${isFocused && 'cell-focused'}`}
      onClick={handleClick}
    >
      {content === 0 ? ' ' : content}
    </div>
  )
}

export default Cell
