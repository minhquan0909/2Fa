import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    id: null,
    username: null,
    full_name: null,
    country: null,
    calling_code: null,
    birthday: null,
    gender: null,
    phone: null,
    phone_verified: null,
    email: null,
    email_verified: null,
    password: null,
    address: null,
    registered_at: null,
    avatar: null,
    session_id: null,
    document_photos: null,
    admin: 0,
  },
  reducers: {
    updateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateProfile} = profileSlice.actions;

export default profileSlice.reducer;
