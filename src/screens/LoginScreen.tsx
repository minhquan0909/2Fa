import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
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
import {Countries} from '../Data/Countries';
import LoginIMG from '../assets/Login.png';
import ForgotPWIMG from '../assets/ForgotPW.png';

const LoginScreen = ({navigation}) => {
  let textInput = useRef(null);
  const defaultCountryCode = '+84';
  const defaultMaskCountry = '39 666 1101';
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [countriesData, setCountriesData] = useState(Countries);
  const [codeCountry, setCodeCountry] = useState(defaultCountryCode);
  const [placeholder, setPlaceHolder] = useState(defaultMaskCountry);
  const [loginOrForgetPw, setLoginOrForgotPW] = useState(true); //Login:true ForgotPw:false
  const onShowModal = () => {
    setModalVisible(!modalVisible);
  };
  const onChangePhone = number => {
    setPhoneNumber(number);
  };
  const onPressLogin = () => {
    // const langCode = 'vi';
    // const baseURL = 'https://helpmiee.com/api/';
    // const loginUrl = `${langCode}/login.json`;

    // const res = await axios.post(baseURL + loginUrl, {
    //   calling_code: '84',
    //   phone: '396661101',
    //   password: 'Aa@123456',
    // });

    // const data = await res.data;
    // console.log(data);
    if (phoneNumber) {
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
    setLoginOrForgotPW(!loginOrForgetPw);
  };
  useEffect(() => {
    textInput.focus();
  }, []);
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
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.keyboardAvoidingViewContainer}>
        <Image
          source={loginOrForgetPw === true ? LoginIMG : ForgotPWIMG}
          style={styles.imgLogin}
        />
        <Text style={styles.introTitle}>
          {loginOrForgetPw === true ? 'Welcome Back !' : 'Forgot Password'}
        </Text>
        <Text style={styles.textTitle}>{'Please input your phone number'}</Text>
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
            ref={input => (textInput = input)}
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
        <View style={styles.forgotPWContainer}>
          <TouchableOpacity hitSlop={20} onPress={changeLoginOrForgotPW}>
            <Text style={styles.textForgotPw}>
              {loginOrForgetPw === true
                ? 'Forgot Password ?'
                : 'Already have account'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onPressLogin}>
            <View
              style={[
                styles.btnLogin,
                {backgroundColor: phoneNumber ? '#1A4F8B' : 'gray'},
              ]}>
              <Text style={styles.textLogin}>{'Send OTP'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(LoginScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 15,
    marginBottom: 50,
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
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  btnLogin: {
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    color: 'white',
    alignItems: 'center',
  },
  imgLogin: {width: 212, height: 212},
  introTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 30,
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
});
