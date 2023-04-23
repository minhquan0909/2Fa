import {createSlice} from '@reduxjs/toolkit';
export const athenSlice = createSlice({
  name: 'auth',
  initialState: {
    calling_code: '',
    phone: '',
  },
  reducers: {
    savePhoneNumber: (state, action) => {
      return {
        ...state,
        calling_code: action.payload.calling_code,
        phone: action.payload.phone,
      };
    },
  },
});
export const {savePhoneNumber} = athenSlice.actions;

export default athenSlice.reducer;
