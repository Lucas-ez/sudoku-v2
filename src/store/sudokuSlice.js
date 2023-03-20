import { createSlice } from '@reduxjs/toolkit'
import { generarSudoku } from './../sudoku'

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState: {
    board: []
  },
  reducers: {
    setBoard (state, action) {
      state.board = action.payload
    },
    setCell (state, action) {
      const [i, j, n] = action.payload
      state.board[i][j] = n
    }
  }
})

export const { setCell } = sudokuSlice.actions
export default sudokuSlice.reducer

export const fetchSudokuByDifficulty = difficulty => {
  return (dispatch) => {
    // eslint-disable-next-line no-undef
    dispatch(setBoard(generarSudoku(difficulty)))
  }
}
