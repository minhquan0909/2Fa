import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ProfileIMG from '../assets/UpdateProfile.png';
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.introTitle}>Profile Screen</Text>
      <Image source={ProfileIMG} style={styles.updateProfileIMG} />

      <View style={styles.textInputArea}>
        <Text style={styles.description}>Please update your profile</Text>
        <View
          style={[
            styles.inputContainer,
            {borderBottomColor: focusPassword ? '#1A4F8B' : 'white'},
          ]}>
          <TextInput
            ref={input => (passwordRef = input)}
            placeholder={'New password'}
            keyboardType="default"
            value={password}
            secureTextEntry={false}
            style={styles.passwordInput}
            onFocus={onChangeFocusPW}
            onBlur={onChangeBlurPW}
            autoFocus={focusPassword}
            onChangeText={onChangePassword}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            {borderBottomColor: focusConfirmPassword ? '#1A4F8B' : 'white'},
          ]}>
          <TextInput
            placeholder={'Confirm password'}
            keyboardType="default"
            value={confirmPassword}
            secureTextEntry={false}
            style={styles.passwordInput}
            onFocus={onChangeFocusConfirmPW}
            onBlur={onChangeBlurConfirmPW}
            autoFocus={focusConfirmPassword}
            onChangeText={onChangeConfirmPW}
          />
        </View>
        <TouchableOpacity onPress={onPressCreateAccount}>
          <View
            style={[
              styles.btnCreateAccount,
              {
                backgroundColor:
                  password && confirmPassword ? '#1A4F8B' : 'gray',
              },
            ]}>
            <Text style={styles.textCreateAccount}>{'Create Account'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default React.memo(ProfileScreen);
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  introTitle: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  updateProfileIMG: {
    marginTop: 50,
    width: 212,
    height: 212,
  },
  description: {
    marginTop: 30,
  },
    textInputArea: {
    width: '100%',
    paddingHorizontal: 50,
  },
});
