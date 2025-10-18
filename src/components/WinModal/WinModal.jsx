import './WinModal.scss'

const WinModal = ({ isOpen, onClose, timer }) => {
  if (!isOpen) return null

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h1 className='modal-title'>🎉 ¡Felicitaciones! 🎉</h1>
        <p className='modal-message'>¡Has completado el Sudoku!</p>
        <p className='modal-time'>Tiempo: {formatTime(timer)}</p>
        <button className='modal-button' onClick={onClose}>
          Nuevo Juego
        </button>
      </div>
    </div>
  )
}

export default WinModal
