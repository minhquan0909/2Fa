import {configureStore} from '@reduxjs/toolkit';
import profile from './profile';
import auththentication from './auththentication';
import secretKey from './secretKey';
export default configureStore({
  reducer: {
    profile,
    auththentication,
    secretKey,
  },
});
