import { configureStore } from '@reduxjs/toolkit'
import sudokuReducer from './sudokuSlice'

const store = configureStore({
  reducer: {
    sudoku: sudokuReducer
  }
})

export default store
