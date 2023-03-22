import { createSlice } from '@reduxjs/toolkit'
import { generarSudoku, resolverSudoku } from './../sudoku'

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState: {
    board: null,
    solvedBoard: null,
    focus: null,
    focusValue: null,
    difficulty: 'normal',
    errors: 0
  },
  reducers: {
    setBoard (state, action) {
      state.board = action.payload
    },
    setSolvedBoard (state, action) {
      state.solvedBoard = action.payload
    },
    setCell (state, action) {
      if (!state.focus) return

      const [i, j, n] = [state.focus[0], state.focus[1], +action.payload]

      if (action.payload === 'Backspace') {
        state.board[i][j] = 0
      } else if (!isNaN(n)) {
        state.board[i][j] = n
      }
    },
    setFocus (state, action) {
      state.focus = action.payload
      state.focusValue = state.board[action.payload[0]][action.payload[1]]
    },
    setDifficulty (state, action) {
      state.difficulty = action.payload
    },
    setErrors (state, action) {
      state.errors = action.payload
    },
    incrementErrors (state) {
      state.errors = state.errors + 1
    }
  }
})

export const {
  setCell,
  setBoard,
  setFocus,
  setSolvedBoard,
  setDifficulty,
  incrementErrors,
  setErrors
} = sudokuSlice.actions
export default sudokuSlice.reducer

export const fetchSudokuByDifficulty = difficulty => {
  return (dispatch) => {
    const auxBoard = generarSudoku(difficulty)
    dispatch(setBoard(auxBoard))
    dispatch(setSolvedBoard(resolverSudoku(auxBoard)))
  }
}
