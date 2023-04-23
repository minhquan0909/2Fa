import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CreateAccountIMG from '../assets/CreateAccount.png';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomTextInput from '../components/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {UpdatePassword} from '../modules/signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateProfile} from '../redux/profileSlice';
const CreateAccountScreen = ({navigation}) => {
  const [focusPassword, setFocusPassword] = useState(true);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userProfile = useSelector(state => state.profile);
  // console.log('userProfile', userProfile);
  // const LocalStorage = async () => {
  //   const keys = await AsyncStorage.getAllKeys();
  //   const items = await AsyncStorage.multiGet(keys);
  //   console.log(items);
  //   return items;
  // };
  // LocalStorage();
  const dispatch = useDispatch();
  const onChangePassword = password => {
    setPassword(password);
  };
  const onChangeConfirmPW = confirmPW => {
    setConfirmPassword(confirmPW);
  };
  const onPressCreateAccount = async () => {
    if (password === confirmPassword) {
      //Password Match
      const res = await UpdatePassword(
        userProfile?.id?.toString(),
        userProfile.session_id,
        password,
      );
      // console.log('Creacted account', res.data);
      if (!res.success) {
        Alert.alert(res.message);
        return;
      }
      dispatch(updateProfile(res.data));
      Alert.alert(res.message);
      navigation.navigate('Profile');
    } else {
      Alert.alert('Password do not match');
    }
  };
  const onChangeFocusPW = () => {
    setFocusPassword(true);
  };
  const onChangeBlurPW = () => {
    setFocusPassword(false);
  };
  const onChangeFocusConfirmPW = () => {
    setFocusConfirmPassword(true);
  };
  const onChangeBlurConfirmPW = () => {
    setFocusConfirmPassword(false);
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior="padding"
      style={styles.keyboardAvoidingViewContainer}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.container}>
            <CustomHeader
              title={'Create account'}
              description={'Create your account password'}
              imgSource={CreateAccountIMG}
            />
            <CustomTextInput
              placeholder={'New password'}
              focusInput={focusPassword}
              value={password}
              onChangeFocus={onChangeFocusPW}
              onChageBlur={onChangeBlurPW}
              autoFocus={focusPassword}
              onChangeText={onChangePassword}
              keyboardType={'default'}
            />
            <CustomTextInput
              placeholder={'Confirm password'}
              focusInput={focusConfirmPassword}
              value={confirmPassword}
              onChangeFocus={onChangeFocusConfirmPW}
              onChageBlur={onChangeBlurConfirmPW}
              autoFocus={focusConfirmPassword}
              onChangeText={onChangeConfirmPW}
              keyboardType={'default'}
            />
          </View>
          <CustomButton
            activeBy={password && confirmPassword}
            title={'Create Account'}
            onPress={onPressCreateAccount}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default React.memo(CreateAccountScreen);
const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', alignItems: 'center', marginBottom: 30},
  createAccountIMG: {
    marginTop: 70,
    width: 212,
    height: 212,
  },
  introTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
  },
  textInputArea: {
    width: '100%',
    paddingHorizontal: 50,
  },
  passwordInput: {
    marginLeft: 5,
    height: 40,
  },
  btnCreateAccount: {
    marginTop: 30,
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCreateAccount: {
    fontSize: 16,
    color: 'white',
  },
  description: {
    paddingVertical: 15,
    textAlign: 'center',
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});
