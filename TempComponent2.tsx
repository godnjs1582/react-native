import React from 'react';
import {Pressable, Text} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {View} from 'react-native-reanimated/lib/typescript/Animated';

const TempComponent2 = () => {
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
    <>
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
    </>
  );
};

export default TempComponent2;
