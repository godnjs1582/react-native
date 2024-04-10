/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  useColorScheme,
  Text,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {accelerometer} from 'react-native-sensors';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export type TypeCalcAction =
  | 'plus'
  | 'minus'
  | 'multiply'
  | 'divide'
  | 'equal'
  | 'clear';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const accelerometerValue = useSharedValue({x: 0, y: 0, z: 0});

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      accelerometerValue.value = {x, y, z};
    });
    return () => subscription.unsubscribe();
  }, [accelerometerValue]);

  const leftBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [-1, 0],
        ['red', 'green'],
      ),
    };
  });

  const rightBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [0, 1],
        ['green', 'red'],
      ),
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        <Animated.View style={[{flex: 1}, leftBackground]} />
        <Animated.View style={[{flex: 1}, rightBackground]} />
      </View>
    </SafeAreaView>
  );
}

export default App;
