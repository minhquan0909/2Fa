import {createSlice} from '@reduxjs/toolkit';
export const secretSlice = createSlice({
  name: 'secretKey',
  initialState: {keys: []},
  reducers: {
    addKey: (state, action) => {
      return {
        ...state,
        keys: [...state.keys, action.payload],
      };
    },
    updateKey: (state, action) => {
      return {
        ...state,
        keys: state.keys.map(key =>
          key.id === action.payload.id ? action.payload : key,
        ),
      };
    },
    removeKey: (state, action) => {
      return {
        ...state,
        keys: state.keys.filter(key => key.id !== action.payload.id),
      };
    },
  },
});
export const {addKey, updateKey, removeKey} = secretSlice.actions;
export default secretSlice.reducer;
