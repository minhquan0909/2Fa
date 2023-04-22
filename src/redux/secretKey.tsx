import {createSlice} from '@reduxjs/toolkit';
export const secretKey = createSlice({
  name: 'secretKey',
  initialState: [
    {
      keyName: '',
      secretKey: '',
    },
  ],
  reducers: {
    addKey: (state, action) => {
      return [...state, action.payload];
    },
    removeKey: (state, action) => {
      return [...state, action.payload];
    },
  },
});
export const {addKey} = secretKey.actions;
export default secretKey.reducer;
