import { createSlice } from '@reduxjs/toolkit'
import { generarSudoku, resolverSudoku } from './../sudoku'

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState: {
    board: null,
    solvedBoard: null,
    focus: null
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
    }
  }
})

export const { setCell, setBoard, setFocus, setSolvedBoard } = sudokuSlice.actions
export default sudokuSlice.reducer

export const fetchSudokuByDifficulty = difficulty => {
  return (dispatch) => {
    const auxBoard = generarSudoku(difficulty)
    dispatch(setBoard(auxBoard))
    dispatch(setSolvedBoard(resolverSudoku(auxBoard)))
  }
}
