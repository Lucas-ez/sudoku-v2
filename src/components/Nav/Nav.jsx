import './Nav.scss'

const Nav = ({ setIsDark }) => {
  return (
    <nav className='w-100 flex flex-between nav'>
      <span>Difficulty: Normal</span>
      <div>
        <i className='fa-solid fa-xmark' />
        <span>12</span>
      </div>
      <span>01:00:12</span>
      <div onClick={() => setIsDark(isDark => !isDark)}>
        <i className='fa-solid fa-moon' />
      </div>
    </nav>
  )
}

export default Nav
