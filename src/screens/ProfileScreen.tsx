import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import ProfileIMG from '../assets/UpdateProfile.png';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import CustomTextInput from '../components/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {PostFunc, UpdateProfile} from '../modules/signup';
import {ProfileModel} from '../modules/model';
import {updateProfile} from '../redux/profileSlice';

const ProfileScreen = ({navigation}) => {
  const [gender, setGender] = useState(null);
  const [birthday, setBirthDay] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [focusFullName, setFocusFullName] = useState(true);
  const [focusEmail, setFocusEmail] = useState(false);
  const [userName, setUserName] = useState('');
  const [focusUserName, setFocusUserName] = useState();
  const dispatch = useDispatch();
  const genderDropdata = ['male', 'female', 'others'];
  const UserProfile = useSelector(state => state.profile);
  // console.log(UserProfile);
  useEffect(() => {
    setUserName(UserProfile.username);
    setGender(UserProfile.gender);
    setBirthDay(new Date(UserProfile.birthday));
    setFullName(UserProfile.full_name);
    setEmail(UserProfile.email);
  }, [UserProfile]);
  const onChangeName = value => {
    setFullName(value);
  };
  // useEffect(() => {});
  const onChangeEmail = value => {
    setEmail(value);
  };
  const onChangeUserName = value => {
    setUserName(value);
  };
  const onPressUpdateProfile = async () => {
    if (fullName && gender && birthday && email) {
      const profileData: ProfileModel = {
        user: UserProfile.id.toString(),
        session_id: UserProfile.session_id,
        username: userName,
        gender: gender,
        full_name: fullName,
        birthday: birthday.toISOString().split('T')[0],
        email: email,
      };
      const updateProfileRes = await PostFunc('UpdateProfile', profileData);
      if (!updateProfileRes.success) {
        Alert.alert(updateProfileRes.message);
        return;
      }
      Alert.alert(updateProfileRes.message);
      dispatch(updateProfile(profileData));
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.keyboardAvoidingViewContainer}>
        <TouchableWithoutFeedback style={styles.innerContainer}>
          <View style={styles.inner}>
            <CustomHeader
              title={'User Profile'}
              description={'Input your information'}
              imgSource={ProfileIMG}
              containerStyle={styles.headerContainer}
            />
            <View style={styles.inputArea}>
              <CustomTextInput
                isPassword={false}
                placeholder={'User name'}
                focusInput={focusUserName}
                value={userName}
                onChangeFocus={() => setFocusUserName(true)}
                onChageBlur={() => setFocusUserName(false)}
                autoFocus={focusUserName}
                onChangeText={onChangeUserName}
                keyboardType={'default'}
              />
              <CustomTextInput
                isPassword={false}
                placeholder={'Full name'}
                focusInput={focusFullName}
                value={fullName}
                onChangeFocus={() => setFocusFullName(true)}
                onChageBlur={() => setFocusFullName(false)}
                autoFocus={focusFullName}
                onChangeText={onChangeName}
                keyboardType={'default'}
              />
              <CustomTextInput
                isPassword={false}
                placeholder={'Email address'}
                focusInput={focusEmail}
                value={email}
                onChangeFocus={() => setFocusEmail(true)}
                onChageBlur={() => setFocusEmail(false)}
                autoFocus={focusEmail}
                onChangeText={onChangeEmail}
                keyboardType={'default'}
              />
              <View style={styles.checkboxandDatePicker}>
                <View style={styles.dropDownContainer}>
                  <Text>Gender:</Text>
                  <SelectDropdown
                    defaultValue={gender}
                    buttonTextStyle={styles.dropDownTextStyle}
                    dropdownStyle={styles.dropDownStyles}
                    buttonStyle={styles.dropDownButton}
                    rowStyle={styles.rowStyle}
                    data={genderDropdata}
                    onSelect={(selectedItem, index) => {
                      setGender(selectedItem);
                      console.log(gender);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                  />
                </View>
                <View style={styles.datePicker}>
                  <Text style={styles.dobTitle}>Date of birth:</Text>
                  <View style={styles.dobContent}>
                    <Text
                      onPress={() => {
                        setOpen(true);
                      }}>
                      {birthday.toDateString()}
                    </Text>
                  </View>

                  <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={birthday}
                    onConfirm={date => {
                      setOpen(false);
                      setBirthDay(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.updateButton}>
              <CustomButton
                activeBy={fullName && email && gender && birthday}
                title={'Update'}
                onPress={onPressUpdateProfile}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(ProfileScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  innerContainer: {},
  headerContainer: {alignItems: 'center'},
  inner: {
    flex: 1,
    width: '100%',
  },
  inputArea: {
    flex: 1,
  },
  checkboxandDatePicker: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dropDownContainer: {
    width: '40%',
  },
  dropDownButton: {
    height: 30,
    borderBottomColor: '#1A4F8B',
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    width: '100%',
  },
  dropDownStyles: {
    borderRadius: 10,
  },
  dropDownTextStyle: {
    fontSize: 14,
  },
  rowStyle: {
    height: 30,
    borderBottomColor: '#1A4F8B',
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  dobTitle: {
    marginBottom: 10,
  },
  datePicker: {},
  updateButton: {alignItems: 'center', marginBottom: 30},
  dobContent: {
    padding: 6,
    borderBottomColor: '#1A4F8B',
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
