import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Countries} from '../Data/Countries';
import ForgotPWIMG from '../assets/ForgotPW.png';
import LoginIMG from '../assets/Login.png';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomTextInput from '../components/CustomTextInput';
import {LoginModel, PhoneModel, ReLogin} from '../modules/model';
import {PostFunc} from '../modules/signup';
import {savePhoneNumber} from '../redux/auththenSlice';
import {updateProfile} from '../redux/profileSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => {
  const defaultCountryCode = '84';
  const defaultMaskCountry = '39 666 1101';
  const loginTitle = 'Login';
  const desc = 'Please input you phone number';
  const signUpTitle = 'Create new account';
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [countriesData, setCountriesData] = useState(Countries);
  const [codeCountry, setCodeCountry] = useState(defaultCountryCode);
  const [placeholder, setPlaceHolder] = useState(defaultMaskCountry);
  const [signInOrSignUp, setSignInOrSignUp] = useState(true); //Login:true Register:false
  const [password, setPassword] = useState('');
  const [focusPassword, setFocusPassword] = useState(false);
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const [loginDirectly, setLoginDirectly] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const phoneData = useSelector(state => state.authen);
  const dispatch = useDispatch();
  // console.log('PhoneDAta', phoneData);
  const onShowModal = () => {
    setModalVisible(!modalVisible);
  };
  const onChangePhone = number => {
    setPhoneNumber(number);
  };
  const onPressLogin = async () => {
    const data: LoginModel = {
      calling_code: codeCountry,
      phone: phoneNumber,
      password: password,
    };
    const res = await PostFunc('Login', data);
    console.log(res);
    if (!res.success) {
      Alert.alert(res.message);
      return;
    }
    Alert.alert(res.message);
    dispatch(updateProfile(res.data));

    navigation.navigate('Home');
  };
  // const profile = useSelector(state => state.profile);
  // console.log(profile);
  useEffect(() => {
    checkUserAlreadyLogin();
  }, []);
  const checkUserAlreadyLogin = async () => {
    const data: ReLogin = {
      user: phoneData.id.toString(),
      session_id: phoneData.session_id,
    };
    const res = await PostFunc('ReLogin', data);
    if (res.success) {
      dispatch(updateProfile(res.data));
      setVisiblePopUp(true);
    }
  };
  const OnSelectLogin = () => {
    setVisiblePopUp(false);
    navigation.navigate('Home');
  };
  const OnSelectUseAnotherAccount = () => {
    setVisiblePopUp(false);
  };
  const onPressCreateAccount = async () => {
    const data: PhoneModel = {
      calling_code: codeCountry,
      phone: phoneNumber,
    };
    const checkRegisterResponse = await PostFunc('CheckPhoneCanRegister', data);
    if (!checkRegisterResponse.success) {
      Alert.alert(checkRegisterResponse.message);
      return;
    }
    const newUserData = checkRegisterResponse.data;
    // console.log(newUserData);
    dispatch(savePhoneNumber(newUserData));
    const oTPData: PhoneModel = {
      calling_code: newUserData.calling_code,
      phone: newUserData.phone,
    };
    const OTPSend = await PostFunc('SendOTP', oTPData);
    if (OTPSend.success) {
      Alert.alert(OTPSend.message);
      navigation.navigate('InputOTP');
    }
  };
  const onChangeFocus = () => {
    setFocusInput(true);
  };
  const onChageBlur = () => {
    setFocusInput(false);
  };
  const onCountryChange = item => {
    setCodeCountry(item?.dialCode);
    setPlaceHolder(item?.mask);
    onShowModal();
  };
  const changeLoginOrForgotPW = () => {
    setSignInOrSignUp(!signInOrSignUp);
  };

  const filterCountries = value => {
    if (value) {
      const countryData = countriesData.filter(
        obj => obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1,
      );
      setCountriesData(countryData);
    } else {
      setCountriesData(Countries);
    }
  };

  const renderLoginPopUp = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={visiblePopUp}>
        <View style={styles.popUpContainer}>
          <View style={styles.popUp}>
            <View style={styles.textArea}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.userName}>{phoneData.username}</Text>
              <Text>Please choose your option</Text>
            </View>
            <View style={styles.buttonArea}>
              <TouchableOpacity
                style={styles.popUpButton}
                onPress={OnSelectLogin}>
                <Text>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popUpButton}
                onPress={OnSelectUseAnotherAccount}>
                <Text>Use other account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  let renderModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder="Filter"
                focusable={true}
                style={styles.filterInput}
              />
            </View>
            <FlatList
              data={countriesData}
              extraData={countriesData}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={styles.countryModalStyle}>
                    <View style={styles.modalItemContainer}>
                      <Text style={styles.modalItemName}>{item.en}</Text>
                      <Text style={styles.modalItemDialCode}>
                        {item.dialCode}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={onShowModal}
            style={styles.closeModalButton}>
            <Text style={styles.closeModalText}>{'Close'}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={30}
      scrollEnabled={false}
      contentContainerStyle={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topView}>
          {renderLoginPopUp()}
          <CustomHeader
            title={signInOrSignUp ? loginTitle : signUpTitle}
            description={desc}
            imgSource={signInOrSignUp ? LoginIMG : ForgotPWIMG}
          />
          <View
            style={[
              styles.inputContainer,
              {borderBottomColor: focusInput ? '#1A4F8B' : 'white'},
            ]}>
            <TouchableOpacity onPress={onShowModal}>
              <View style={styles.openDialogView}>
                <Text>{codeCountry + ' |'}</Text>
              </View>
            </TouchableOpacity>
            {renderModal()}
            <TextInput
              placeholder={placeholder}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={onChangePhone}
              secureTextEntry={false}
              style={styles.phoneInput}
              onFocus={onChangeFocus}
              onBlur={onChageBlur}
              autoFocus={focusInput}
            />
          </View>
          {signInOrSignUp ? (
            <CustomTextInput
              placeholder={'Password'}
              keyboardType={'default'}
              value={password}
              onChangeText={input => setPassword(input)}
              onChangeFocus={() => setFocusPassword(true)}
              onChageBlur={() => setFocusPassword(false)}
              autoFocus={focusPassword}
              focusInput={focusPassword}
              isPassword={true}
            />
          ) : (
            ''
          )}
          <View style={styles.forgotPWContainer}>
            <TouchableOpacity hitSlop={20} onPress={changeLoginOrForgotPW}>
              <Text style={styles.textForgotPw}>
                {signInOrSignUp === true
                  ? 'Create new accounts'
                  : 'Already have account'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          <CustomButton
            activeBy={phoneNumber}
            title={signInOrSignUp ? 'Login' : 'Send OTP'}
            onPress={signInOrSignUp ? onPressLogin : onPressCreateAccount}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default React.memo(LoginScreen);
const styles = StyleSheet.create({
  inner: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  openDialogView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInput: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },
  bottomView: {
    marginBottom: 20,
    alignItems: 'center',
  },
  forgotPWContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingTop: 10,
  },
  textForgotPw: {
    color: '#1A4F8B',
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  filterInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#1A4F8B',
  },
  countryModalStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
  },
  modalItemName: {
    flex: 1,
    fontSize: 16,
  },
  modalItemDialCode: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeModalText: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  popUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
  },
  buttonArea: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: 'orange',
    backgroundColor: 'white',
    borderWidth: 0.5,
    margin: 5,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  topView: {
    width: '100%',
  },
});
