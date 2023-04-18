import React from 'react';
import {View, Text} from 'react-native';
const ProfileScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
    </View>
  );
};
export default React.memo(ProfileScreen);
