import {createSlice} from '@reduxjs/toolkit';
export const auththentication = createSlice({
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
export const {savePhoneNumber} = auththentication.actions;

export default auththentication.reducer;
