import './App.scss'
import { Board } from './components'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCell } from './store/sudokuSlice'

function App () {
  const dispatch = useDispatch()

  const handleKeyPress = e => {
    dispatch(setCell(e.key))
    // puedo agregar acá el cambiar el focus con cursores
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    // return document.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className='flex flex-column flex-center vh-100'>
      <Board />
    </div>
  )
}

export default App
