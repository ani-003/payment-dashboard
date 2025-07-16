// components/common/FlipCard.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function FlipCard({
  isFlipped,
  frontContent,
  backContent,
  direction = 'y',
  duration = 500,
  style,
}) {
  const isDirectionX = direction === 'x';

  const frontStyle = useAnimatedStyle(() => {
    const spin = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotate = withTiming(`${spin}deg`, { duration });

    return {
      transform: [isDirectionX ? { rotateX: rotate } : { rotateY: rotate }],
      zIndex: isFlipped.value === 0 ? 1 : 0,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const spin = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotate = withTiming(`${spin}deg`, { duration });

    return {
      transform: [isDirectionX ? { rotateX: rotate } : { rotateY: rotate }],
      zIndex: isFlipped.value === 1 ? 1 : 0,
    };
  });

  return (
    <View style={[styles.cardContainer, style]}>
      <Animated.View style={[styles.card, frontStyle]}>
        {frontContent}
      </Animated.View>
      <Animated.View style={[styles.card, styles.back, backStyle]}>
        {backContent}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
  
  },
  card: {
    position: 'absolute',

    backfaceVisibility: 'hidden',
  },
  back: {
    transform: [{ rotateY: '180deg' }],
  },
});
