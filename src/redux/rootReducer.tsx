import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import profileReducer from './profileSlice';
import authenReducer from './auththenSlice';
import secretReducer from './secretSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const secretPersistConfig = {
  key: 'secret',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  // profile: persistReducer(persistConfig, profile),
  profile: persistReducer(persistConfig, profileReducer),
  authen: persistReducer(persistConfig, authenReducer),
  secret: persistReducer(secretPersistConfig, secretReducer),
});
export default rootReducer;
