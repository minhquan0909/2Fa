// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import HomeScreen from './src/screens/HomeScreen';
import InputOTPScreen from './src/screens/InputOTPScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingScreen from './src/screens/SettingScreen';
import store from './src/redux/store';
import {Provider} from 'react-redux';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerBackTitle: '',
              headerLeft: undefined,
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="InputOTP"
            component={InputOTPScreen}
            options={{title: 'Input OTP', headerBackTitle: ''}}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccountScreen}
            options={{
              title: 'Create Account',
              headerBackTitle: '',
              headerLeft: undefined,
            }}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              title: 'Setting',
              headerBackTitle: '',
              headerLeft: undefined,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
