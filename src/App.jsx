import './App.scss'
import { Board, Nav, Keyboard } from './components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCell } from './store/sudokuSlice'

function App () {
  // agregar modo oscuro
  const [isDark, setIsDark] = useState(false)
  const dispatch = useDispatch()

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

  return (
    <div className='w-100 flex flex-column vh-100 container'>
      <Nav setIsDark={setIsDark} />
      <Board />
      <Keyboard handleVirtualKeyPress={handleVirtualKeyPress} />
    </div>
  )
}

export default App
