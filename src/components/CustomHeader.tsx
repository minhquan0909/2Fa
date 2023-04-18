import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const CustomHeader = props => {
  const {imgSource, title, description, containerStyle} = props;
  return (
    <View style={containerStyle}>
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
    marginVertical: 30,
  },
  imgLogin: {width: 212, height: 212},
  textTitle: {
    fontSize: 15,
    marginBottom: 50,
  },
  containerStyle: {
    width: '100%',
  },
});
