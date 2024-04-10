/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  useColorScheme,
  Text,
  Pressable,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

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
  const value = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    value.value = event.contentOffset.y;
  });

  const floatingButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(value.value, [50, 100], [50, -100], {
            extrapolateRight: Extrapolation.CLAMP,
          }),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Animated.FlatList
        style={{flex: 1}}
        onScroll={onScroll}
        scrollEventThrottle={1}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={({item}) => {
          return (
            <View
              style={{
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
      <Pressable style={{position: 'absolute', right: 24, bottom: 24}}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            },
            floatingButtonStyle,
          ]}>
          <Text style={{color: 'white', fontSize: 24}}>+</Text>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
}

export default App;