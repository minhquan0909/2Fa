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
import HomeIMG from '../assets/HomeIMG.png';
import AddNewIC from '../assets/add_ic.png';
import CoppyIC from '../assets/copy_ic.png';
import FB_IC from '../assets/fb_ic.png';
import Insta_IC from '../assets/insta_ic.png';
import Reddit_IC from '../assets/red_ic.png';
import SettingIC from '../assets/setting_ic.png';
import Tele_IC from '../assets/telegram_ic.png';
import CustomHeader from '../components/CustomHeader';
import CustomTextInput from '../components/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {addKey} from '../redux/secretKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create a new TOTP object.
let totp = new OTPAuth.TOTP({
  issuer: 'ACME',
  label: 'AzureDiamond',
  algorithm: 'SHA1',
  digits: 6,
  period: 5,
  secret: 'NB2W45DFOIZA', // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
});

const HomeScreen = ({navigation}) => {
  const [oTPgen, setOTPgen] = useState('------');
  const [counter, setCounter] = useState(30);
  const [secretValue, setSecretValue] = useState('');
  const [secretKeyName, setSecretKeyName] = useState();
  const [modalFeaturesVisible, setModalFeaturesVisible] = useState(false);
  const [secretKeyList, setSecretKeyList] = useState([]);
  const [selectedValue, setSelecedValue] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const getAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const parsedData = items.map(item => ({name: item[0], value: item[1]}));
      setSecretKeyList(parsedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  // console.log(secretKeyList);
  const onPressCopyCode = () => {
    console.log(oTPgen);
  };
  const OnpressCreateNewKey = () => {
    setSecretKeyName('');
    setSecretValue('');
    setModalFeaturesVisible(!modalFeaturesVisible);
  };

  const renderItem = ({index, item}) => {
    const onPressAuthenItem = () => {
      console.log('currentkey', selectedValue);
      setSelecedValue(item.value);
      console.log('selectedKey', item.value);
      const curentSelectedKey = item.value;
      const newTotp = new OTPAuth.TOTP({
        issuer: 'User',
        label: item.name,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: item.value, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
      });
      if (curentSelectedKey !== selectedValue) {
        const countDown = setInterval(() => {
          console.log(newTotp);
          const now = Math.floor(Date.now() / 1000);
          const timeRemaining = 30 - (now % 30); //Create timer
          const otpCode = newTotp.generate(); //OTP genegrate
          setOTPgen(otpCode); //BUG if select another key, system didn't delete the old key
          setCounter(timeRemaining);
          // console.log(otpCode, timeRemaining, newTotp);
        }, 1000);
        return () => clearInterval(countDown);
      }
    };
    const onLongPressAuthenItem = () => {
      Alert.alert('Modify');
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
  const OnPressSaveKey = async () => {
    // console.log('Show QR CODE');
    if (secretKeyName && secretValue) {
      // dispatch(addKey({secretKeyName, secretValue}));
      await AsyncStorage.setItem(secretKeyName, secretValue);
      Alert.alert('Your key have been save');
      getAllData();
      setModalFeaturesVisible(false);
    }
  };
  // const devices = useCameraDevices('wide-angle-camera');
  // const device = devices.back;
  const renderPopUpModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalFeaturesVisible}
        onRequestClose={() => {
          setModalFeaturesVisible(modalFeaturesVisible);
        }}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            {/* <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
            /> */}
            <View style={styles.popupBackground}>
              <Text>Input your OTP</Text>
              <CustomTextInput
                placeholder={'Secret key name'}
                value={secretKeyName}
                onChangeText={value => setSecretKeyName(value)}
                keyboardType={'default'}
              />
              <CustomTextInput
                placeholder={'Secret value'}
                value={secretValue}
                onChangeText={value => setSecretValue(value)}
                keyboardType={'default'}
              />
              <TouchableOpacity onPress={OnPressSaveKey}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
          <Text style={styles.codeStyle}>{oTPgen}</Text>
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={onPressCopyCode}>
            <Image source={CoppyIC} style={styles.coppyIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.codeListArea}>
        <View style={styles.flatListContainer}>
          <TouchableOpacity onPress={OnpressCreateNewKey}>
            <View style={styles.listItem}>
              <Image source={AddNewIC} style={styles.itemIconIMG} />
              <Text>{'Add new key'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          style={[styles.flatListContainer, {marginBottom: 100}]}
          data={secretKeyList}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};
export default React.memo(HomeScreen);
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
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
    backgroundColor: 'orange',
    width: 300,
    height: 200,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
