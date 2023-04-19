import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
const HomeScreen = ({navigation}) => {
  const [selelectedCode, setSelectedCode] = useState();
  const [randomNumber, setRandomNumber] = useState(981232);
  const [counter, setCounter] = useState(30);
  const [modalFeaturesVisible, setModalFeaturesVisible] = useState(false);

  const DUMP_ATHENCODES = [
    {id: 1, codeName: 'Facebook', icon: FB_IC},
    {id: 2, codeName: 'Instagram', icon: Insta_IC},
    {id: 3, codeName: 'Telegram', icon: Tele_IC},
    {id: 4, codeName: 'Reddit', icon: Reddit_IC},
  ];
  const addNewItem = {id: 0, codeName: 'Add new', icon: AddNewIC};
  const DUMPCOMPLETE_DATA = [addNewItem, ...DUMP_ATHENCODES];
  const onPressCopyCode = () => {
    console.log(randomNumber);
  };
  const renderItem = ({item}) => {
    const onPressAuthenItem = () => {
      if (item.id === 0) {
        Alert.alert('Add new item');
      }
    };
    const onLongPressAuthenItem = () => {
      if (item.id !== 0) {
        Alert.alert('Delete code?');
      }
    };
    return (
      <TouchableOpacity
        key={item.id}
        onPress={onPressAuthenItem}
        onLongPress={onLongPressAuthenItem}>
        <View style={styles.listItem}>
          <Image source={item.icon} style={styles.itemIconIMG} />
          <Text>{item.codeName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onPressSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
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
          <Text style={styles.codeStyle}>{randomNumber}</Text>
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={onPressCopyCode}>
            <Image source={CoppyIC} style={styles.coppyIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.codeListArea}>
        <FlatList
          style={styles.flatListContainer}
          data={DUMPCOMPLETE_DATA}
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
});
