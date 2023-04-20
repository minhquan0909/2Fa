import {configureStore} from '@reduxjs/toolkit';
import profile from './profile';
import auththentication from './auththentication';
export default configureStore({
  reducer: {
    profile,
    auththentication,
  },
});
