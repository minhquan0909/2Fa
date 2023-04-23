import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const CustomHeader = props => {
  const {imgSource, title, description, containerStyle} = props;
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Text style={styles.introTitle}>{title}</Text>
      <Image source={imgSource} style={styles.imgLogin} />
      <Text style={styles.textTitle}>{description}</Text>
    </View>
  );
};
export default React.memo(CustomHeader);
const styles = StyleSheet.create({
  introTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
  },
  imgLogin: {width: 250, height: 250},
  textTitle: {
    fontSize: 15,
    marginVertical: 15,
  },
  containerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
