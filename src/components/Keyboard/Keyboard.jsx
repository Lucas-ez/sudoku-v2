import './Keyboard.scss'
import { useRef } from 'react'

const Keyboard = ({ handleVirtualKeyPress }) => {
  const keyboardRef = useRef()
  const keyboardIconRef = useRef()

  const handleKeyboard = () => {
    keyboardRef.current.classList.toggle('keyboard-expanded')
    keyboardIconRef.current.classList.toggle('hidden')
  }

  return (
    <div className='w-100 flex flex-column keyboard'>
      <div className='keyboard-numbers' ref={keyboardRef}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
            <button onClick={() => handleVirtualKeyPress(num)} key={num} className='bg-light-grey'>
              {
                num !== 0
                  ? num
                  : <i className='fa-solid fa-delete-left' />
              }
            </button>
          ))
        }
      </div>
      <i onClick={handleKeyboard} ref={keyboardIconRef} className='fa-regular fa-keyboard fs-48' />
    </div>
  )
}

export default Keyboard
