import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const InputOTPScreen = ({navigation}) => {
  let textInput = useRef(null);
  let clockCall = null;
  const lengthInput = 6;
  const defaultCountDown = 30;
  const [internalValue, setInternalValue] = useState('');
  const [countDown, setCountDown] = useState(defaultCountDown);
  const [enableResend, setEnableResend] = useState(false);
  useEffect(() => {
    textInput.focus();
  }, []);
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });
  const decrementClock = () => {
    if (countDown === 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countDown - 1);
    }
  };
  const onChangedText = value => {
    setInternalValue(value);
    if (value.length === lengthInput) {
      navigation.navigate('Home');
    }
  };
  const onChangeNumber = () => {
    setInternalValue('');
  };
  const onResendOTP = () => {
    if (enableResend) {
      setCountDown(defaultCountDown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        keyboardVerticalOffset={50}
        behavior="padding">
        <Text style={styles.title}>{'Input your OTP code send via SMS'}</Text>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangedText}
            style={{width: 0, height: 0}}
            value={internalValue}
            maxLength={lengthInput}
            // returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={styles.inputContainer}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  style={[
                    styles.cell,
                    {
                      borderBottomColor:
                        index === internalValue.length ? '#FB6C6A' : '#1A4F8B',
                    },
                  ]}
                  key={index}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalValue && internalValue.length > 0
                      ? internalValue[index]
                      : ''}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.changeText}>Change number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResendCode}>
              <Text
                style={[
                  styles.textResendCode,
                  {color: enableResend ? '#234DB7' : 'gray'},
                ]}>
                Resend OTP ({countDown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default React.memo(InputOTPScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    marginVertical: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  changeText: {
    color: '#234DB7',
    fontSize: 15,
  },
  btnResendCode: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResendCode: {
    fontSize: 15,
  },
});
