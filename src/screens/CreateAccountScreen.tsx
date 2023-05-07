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
import {PostFunc, UpdatePassword} from '../modules/signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateProfile} from '../redux/profileSlice';
import {UpdatePasswordModel} from '../modules/model';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const CreateAccountScreen = ({navigation, route}) => {
  const [focusPassword, setFocusPassword] = useState(true);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userProfile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const onChangePassword = password => {
    setPassword(password);
  };
  const onChangeConfirmPW = confirmPW => {
    setConfirmPassword(confirmPW);
  };
  const onPressCreateAccount = async () => {
    // console.log(route.params);
    if (password === confirmPassword) {
      //Password Match
      const updatePasswordData: UpdatePasswordModel = {
        user: userProfile?.id?.toString(),
        session_id: userProfile.session_id,
        password: password,
      };
      const updatePasswordres = await PostFunc(
        'UpdatePassword',
        updatePasswordData,
      );
      // console.log('Creacted account', res.data);
      if (!updatePasswordres.success) {
        Alert.alert(updatePasswordres.message);
        return;
      }
      dispatch(updateProfile(updatePasswordres.data));
      Alert.alert(updatePasswordres.message);
      if (route.params.flag === 1) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Profile');
      }
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
    <KeyboardAwareScrollView
      extraScrollHeight={30}
      scrollEnabled={false}
      contentContainerStyle={styles.keyboardAvoidingViewContainer}>
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
              isPassword={true}
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
              isPassword={true}
            />
          </View>
          <CustomButton
            activeBy={password && confirmPassword}
            title={'Update'}
            onPress={onPressCreateAccount}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
