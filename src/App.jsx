import './App.scss'
import { Board, Nav, Keyboard } from './components'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setCell } from './store/sudokuSlice'

function App () {
  // agregar modo oscuro
  const dispatch = useDispatch()
  const darkThemeRef = useRef()

  const handleKeyPress = e => {
    dispatch(setCell(e.key))
    // puedo agregar acá el cambiar el focus con cursores
  }
  const handleVirtualKeyPress = key => {
    dispatch(setCell(key))
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
  }, [])

  const handleDarkTheme = () => {
    darkThemeRef.current.classList.toggle('dark-theme')
  }

  return (
    <div ref={darkThemeRef}>
      <div className='w-100 flex flex-column vh-100 container'>
        <Nav handleDarkTheme={handleDarkTheme} />
        <Board />
        <Keyboard handleVirtualKeyPress={handleVirtualKeyPress} />
      </div>
    </div>
  )
}

export default App
