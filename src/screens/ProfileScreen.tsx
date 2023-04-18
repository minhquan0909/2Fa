import React, {useState} from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import ProfileIMG from '../assets/UpdateProfile.png';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';

const ProfileScreen = () => {
  const [gender, setGender] = useState('male');
  const [birthday, setBirthDay] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [focusFullName, setFocusFullName] = useState(true);
  const [focusBirthDay, setFocusBirthDay] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusGender, setForcusGender] = useState(false);
  const onChangeName = value => {
    setFullName(value);
  };
  const onChangeBirthday = value => {
    setBirthDay(value);
  };
  const onChangeGender = value => {
    setGender(value);
  };
  const onChangeEmail = value => {
    setEmail(value);
  };
  const onPressUpdateProfile = () => {
    Alert.alert('OK');
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
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) =>
                    setGender(itemValue)
                  }>
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Others" value="others" />
                </Picker>
                {/* <CustomTextInput
                  placeholder={'BirthDay'}
                  focusInput={focusBirthDay}
                  value={birthday}
                  onChangeFocus={() => setFocusBirthDay(true)}
                  onChageBlur={() => setFocusBirthDay(false)}
                  autoFocus={focusBirthDay}
                  onChangeText={onChangeBirthday}
                  keyboardType={'default'}
                /> */}
                {/* <DatePicker
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
                /> */}
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <CustomButton
                activeBy={fullName && email}
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
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {alignItems: 'center'},
  inner: {
    width: '100%',
  },
  inputArea: {
    width: '100%',
  },
  checkboxandDatePicker: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});
