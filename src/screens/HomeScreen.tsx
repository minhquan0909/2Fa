import * as OTPAuth from 'otpauth';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HomeIMG from '../assets/HomeIMG.png';
import AddNewIC from '../assets/add_ic.png';
import CoppyIC from '../assets/copy_ic.png';
import SettingIC from '../assets/setting_ic.png';
import Tele_IC from '../assets/telegram_ic.png';
import CustomHeader from '../components/CustomHeader';
import CustomTextInput from '../components/CustomTextInput';
import {addKey, removeKey, updateKey} from '../redux/secretSlice';
import {CurrentRenderContext} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HomeScreen = ({navigation}) => {
  const [otp, setOTP] = useState('');
  const [counter, setCounter] = useState(5);
  const [secretValue, setSecretValue] = useState('');
  const [secretKeyName, setSecretKeyName] = useState('');
  const [modalFeaturesVisible, setModalFeaturesVisible] = useState(false);
  const [secretKeyList, setSecretKeyList] = useState([]);
  const dispatch = useDispatch();
  const secretKeyStore = useSelector(state => state.secret.keys);
  const [isUpdate, setIsUpdate] = useState(false); //create=true
  const [selectedItemID, setSelectedItemID] = useState();
  const [auth, setAuth] = useState(null);
  const [authName, setAuthName] = useState('');
  const [keyUri, setKeyUri] = useState(null);
  useEffect(() => {
    setSecretKeyList(secretKeyStore);
  }, [secretKeyStore]);
  // console.log(secretKeyList);
  const onPressCopyCode = () => {
    console.log(otp);
  };
  const OnpressCreateNewKey = () => {
    setSecretKeyName('');
    setSecretValue('');
    setModalFeaturesVisible(!modalFeaturesVisible);
    console.log('OnpressCreateNewKey');
  };
  const OnPressDelete = () => {
    dispatch(removeKey({id: selectedItemID}));
    setIsUpdate(false);
    setModalFeaturesVisible(false);
  };
  // console.log(auth);
  useEffect(() => {
    const countDownFunc = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeRemain = 5 - (now % 5); //Create timer. It should be 30, I know, but i want to see the change timer sooner
      setCounter(timeRemain);
    }, 1000);
    return () => clearInterval(countDownFunc);
  }, []);

  useEffect(() => {
    // Create key checker, if new select new key, we create new OTP object with following info
    // then setState for newAuth
    if (keyUri) {
      const newAuth = new OTPAuth.TOTP({
        issuer: 'User',
        label: authName,
        algorithm: 'SHA1',
        digits: 6,
        period: 5,
        secret: keyUri,
      });
      setAuth(newAuth);
    } else {
      setAuth(null);
    }
  }, [keyUri]);
  useEffect(() => {
    // AuthKey and counter checker, when counter change or Auth change, create new OTP then setState for it
    if (auth) {
      const newOTP = auth.generate();
      setOTP(newOTP);
    } else {
      setOTP(null);
    }
  }, [auth, counter]);

  const renderItem = ({index, item}) => {
    const onPressAuthenItem = () => {
      setSelectedItemID(item.id);
      setKeyUri(item.value);
      setAuthName(item.name);
      console.log(auth, otp, keyUri);
    };
    const onLongPressAuthenItem = () => {
      setSelectedItemID(item.id);
      setModalFeaturesVisible(true);
      setIsUpdate(true);
      setSecretKeyName(item.name);
      setSecretValue(item.value);
    };
    return (
      <TouchableOpacity
        key={index}
        onPress={onPressAuthenItem}
        onLongPress={onLongPressAuthenItem}>
        <View style={styles.listItem}>
          <Image source={Tele_IC} style={styles.itemIconIMG} />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onPressSetting = () => {
    navigation.navigate('Setting');
  };
  const DispatchAddKey = () => {
    const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    dispatch(
      addKey({id: randomNumber, name: secretKeyName, value: secretValue}),
    );
    Alert.alert('Your key have been create');
  };
  const DispatchUpdateKey = () => {
    dispatch(
      updateKey({id: selectedItemID, name: secretKeyName, value: secretValue}),
    );
    setIsUpdate(false);
    Alert.alert('Your key have been update');
  };

  const OnPressSaveKey = async () => {
    // console.log('Show QR CODE');
    if (secretKeyName && secretValue) {
      // dispatch(addKey({secretKeyName, secretValue}));
      if (isUpdate === false) {
        DispatchAddKey();
      } else {
        DispatchUpdateKey();
      }
      // getAllData();
      setModalFeaturesVisible(false);
    }
  };
  // const devices = useCameraDevices('wide-angle-camera');
  // const device = devices.back;
  // AsyncStorage.clear()
  const renderPopUpModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalFeaturesVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'blue ',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <KeyboardAwareScrollView
            contentContainerStyle={{backgroundColor: 'red'}}
            scrollEnabled={false}>
            <View style={styles.modalContainer}>
              {/* <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
              /> */}
              <View style={styles.popupBackground}>
                <Text style={styles.popUpTitle}>Input your OTP</Text>
                <CustomTextInput
                  placeholder={'Secret key name'}
                  value={secretKeyName}
                  onChangeText={value => setSecretKeyName(value)}
                  keyboardType={'default'}
                  containerStyle={styles.popUPTextInputContainer}
                />
                <CustomTextInput
                  placeholder={'Secret value'}
                  value={secretValue}
                  onChangeText={value => setSecretValue(value)}
                  keyboardType={'default'}
                  containerStyle={styles.popUPTextInputContainer}
                />
                <View style={styles.popUpButtonArea}>
                  <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={OnPressSaveKey}>
                    <Text>Save</Text>
                  </TouchableOpacity>
                  {isUpdate ? (
                    <TouchableOpacity
                      style={[styles.buttonSave, {backgroundColor: 'pink'}]}
                      onPress={OnPressDelete}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  ) : (
                    ''
                  )}
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    );
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.topBarContainer}>
        {renderPopUpModal()}
        <TouchableOpacity style={styles.topButton} onPress={onPressSetting}>
          <Image source={SettingIC} style={styles.settingIC} />
        </TouchableOpacity>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{counter}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <CustomHeader
          title={'2FA Authenticator'}
          description={'Authentication code'}
          imgSource={HomeIMG}
          containerStyle={styles.headerContainer}
        />
      </View>
      <View style={styles.codeArea}>
        <View style={styles.codeRow}>
          <Text style={styles.codeStyle}>{otp ? otp : '------'}</Text>
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={onPressCopyCode}>
            <Image source={CoppyIC} style={styles.coppyIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.codeListArea}>
        <View style={[styles.flatListContainer, {height: 60}]}>
          <TouchableOpacity onPress={OnpressCreateNewKey}>
            <View style={styles.listItem}>
              <Image source={AddNewIC} style={styles.itemIconIMG} />
              <Text>{'Add new key'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          style={[styles.flatListContainer]}
          data={secretKeyList}
          renderItem={renderItem}
          disableIntervalMomentum={true}
        />
      </View>
    </View>
  );
};
export default React.memo(HomeScreen);
const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  topButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
  },
  settingIC: {
    width: 30,
    height: 30,
  },
  content: {},
  headerContainer: {alignItems: 'center'},
  codeArea: {
    height: 60,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  codeStyle: {
    fontSize: 20,
    letterSpacing: 15,
    color: '#FF7417',
    fontWeight: '300',
  },
  coppyIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
  },
  imgContainer: {
    justifyContent: 'center',
  },
  codeListArea: {
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  listItem: {
    // backgroundColor: 'gray',
    paddingVertical: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#FF7417',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemIconIMG: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
  },
  flatListContainer: {
    width: '100%',
    paddingHorizontal: 10,
    height: 150,
  },
  counterContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
  },
  counterText: {
    color: '#FF7417',
    fontSize: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBackground: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    padding: 10,
  },
  modalButton: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  popUPTextInputContainer: {
    borderColor: 'orange',
    borderWidth: 0.5,
    borderBottomColor: 'orange',
    borderBottomWidth: 0.5,
  },
  popUpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonSave: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 5,
  },
  popUpButtonArea: {flexDirection: 'row', justifyContent: 'space-evenly'},
});
