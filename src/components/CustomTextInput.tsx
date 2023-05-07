import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IC_Hide from '../assets/hide.png';
import IC_Show from '../assets/show.png';
function CustomTextInput(props) {
  const {
    placeholder,
    keyboardType,
    value,
    onChangeText,
    onChangeFocus,
    onChageBlur,
    autoFocus,
    focusInput,
    containerStyle,
    isPassword,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    isPassword ? setShowPassword(true) : setShowPassword(false);
  }, []);
  return (
    <View
      style={[
        styles.inputContainer,
        {borderBottomColor: focusInput ? '#1A4F8B' : 'white'},
        containerStyle,
      ]}>
      <TextInput
        secureTextEntry={showPassword}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        style={styles.textInputStyle}
        onFocus={onChangeFocus}
        onBlur={onChageBlur}
        autoFocus={autoFocus}
      />
      {isPassword ? (
        <View style={styles.rightIconContainer}>
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={30}>
            <Image
              source={showPassword ? IC_Show : IC_Hide}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}
    </View>
  );
}

export default React.memo(CustomTextInput);
const styles = StyleSheet.create({
  textInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    marginVertical: 10,
  },
  rightIconContainer: {
    // backgroundColor: 'red',
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
});
