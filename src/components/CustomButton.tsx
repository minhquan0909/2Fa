import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = props => {
  const {onPress, activeBy, title} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.btnLogin,
          {backgroundColor: activeBy ? '#1A4F8B' : 'gray'},
        ]}>
        <Text style={styles.textLogin}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(CustomButton);
const styles = StyleSheet.create({
  btnLogin: {
    width: 350,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    color: 'white',
    alignItems: 'center',
  },
});
