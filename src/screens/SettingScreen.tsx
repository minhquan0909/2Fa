import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import SettingIMG from '../assets/account_setting.png';
const SETTING_LIST_ITEM = [
  {
    id: 1,
    name: 'Update profile',
    icon: 'name',
    navigationPath: 'Profile',
  },
  {
    id: 2,
    name: 'Change password',
    icon: 'name',
    navigationPath: 'CreateAccount',
  },
  {id: 3, name: 'Log out', icon: 'name', navigationPath: 'Login'},
];

const SettingScreen = ({navigation}) => {
  const onPressItem = path => {
    navigation.navigate(path, {flag: 1});
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPressItem(item.navigationPath)}>
        <View style={styles.itemRow}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomHeader
          title={'Setting'}
          description={'Change your setting'}
          imgSource={SettingIMG}
          containerStyle={styles.headerContainer}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList data={SETTING_LIST_ITEM} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default SettingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    // backgroundColor: 'orange',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#1A4F8B',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemRow: {
    flexDirection: 'row',
  },
});
