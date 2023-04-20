import {createSlice} from '@reduxjs/toolkit';

export const profile = createSlice({
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        id: action.payload.id,
        session_id: action.payload.session_id,
        full_name: action.payload.full_name,
        email: action.payload.email,
        birthday: action.payload.birthday,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateProfile} = profile.actions;

export default profile.reducer;
