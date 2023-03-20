import './App.scss'
import { Board } from './components'
import { Provider } from 'react-redux'
import store from './store/store'

function App () {
  return (
    <div className='flex flex-column flex-center vh-100'>
      <Provider store={store}>
        <Board />
      </Provider>
    </div>
  )
}

export default App
