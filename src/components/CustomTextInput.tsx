import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
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
  } = props;
  return (
    <View
      style={[
        styles.inputContainer,
        {borderBottomColor: focusInput ? '#1A4F8B' : 'white'},
      ]}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={false}
        style={styles.textInputStyle}
        onFocus={onChangeFocus}
        onBlur={onChageBlur}
        autoFocus={autoFocus}
      />
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
});
