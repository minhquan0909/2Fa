import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Text, View} from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(10);
  const animatedValue = useRef(new Animated.Value(count)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: count * 1000,
      useNativeDriver: true,
    }).start(() => setCount(10));
  }, [animatedValue, count]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.Text style={{fontSize: 60}}>{animatedValue}</Animated.Text>

      <Button title="Start Countdown" onPress={() => setCount(10)} />
    </View>
  );
};

export default Counter;
