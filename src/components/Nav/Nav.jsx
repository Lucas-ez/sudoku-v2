import './Nav.scss'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDifficulty } from '../../store/sudokuSlice'

const Nav = ({ handleDarkTheme }) => {
  const dispatch = useDispatch()
  const { difficulty, errors } = useSelector(state => state.sudoku)

  const diffRef = useRef()

  const handleChangeDifficulty = (e) => {
    dispatch(setDifficulty(e.target.innerText.toLowerCase()))
    handleDiffRef()
  }

  const handleDiffRef = () => {
    diffRef.current.classList.toggle('diff-menu-open')
  }

  return (
    <nav className='w-100 flex flex-between'>
      <button className='fs-20 fw-5 text-uppercase' onClick={handleDiffRef}>{difficulty}</button>
      <ul ref={diffRef} className='diff-menu'>
        <li onClick={handleChangeDifficulty} className='text-uppercase'>easy</li>
        <li onClick={handleChangeDifficulty} className='text-uppercase'>normal</li>
        <li onClick={handleChangeDifficulty} className='text-uppercase'>hard</li>
        <li onClick={handleDiffRef}>
          <i className='fa-solid fa-xmark' />
        </li>
      </ul>
      <div className='nav-error flex flex-between' style={{ opacity: (errors === 0) ? '0' : '1' }}>
        <span>{errors}</span>
        <i className='fa-solid fa-xmark' />
      </div>
      <span>01:00:12</span>
      <button onClick={handleDarkTheme} className='dark-icon'>
        <i className='fa-solid fa-moon' />
      </button>
    </nav>
  )
}

export default Nav
