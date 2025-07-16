import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

const INITIAL_BOX_SIZE = 0;
const SLIDER_WIDTH = 250;

const Slider = () => {
  const offset = useSharedValue(0);
  const MAX_OFFSET = SLIDER_WIDTH;

  const [priority, setPriority] = useState('low');

  const [color, setColor] = useState('#00fc76ff');

  const getPriorityColor = (level) => {
    switch (level) {
      case 'low':
        return '#00fc76ff';
      case 'medium':
        return '#fece31ff';
      case 'high':
        return '#f64444ff';
      default:
        return '#E0E0E0';
    }
  };



  const pan = Gesture.Pan().onChange((event) => {
    const next = offset.value + event.changeX;
    if (next < 0) offset.value = 0;
    else if (next > MAX_OFFSET) offset.value = MAX_OFFSET;
    else offset.value = next;
  });

  // Derived value to calculate width
  const currentWidth = useDerivedValue(() => {
    return INITIAL_BOX_SIZE + offset.value;
  });

  const [visibleWidth, setVisibleWidth] = React.useState(INITIAL_BOX_SIZE);

  const widthPercent = (visibleWidth / SLIDER_WIDTH)*100;

  if (widthPercent < 33 ) {
    setPriority('low');
  }
  if (widthPercent >= 33 && widthPercent < 66) {
    setPriority('medium');
  }
  else if (widthPercent >= 66) {
    setPriority('high');
  }

  // Re-run whenever value changes
  useAnimatedReaction(
    () => currentWidth.value,
    (value) => {
      runOnJS(setVisibleWidth)(Math.round(value));
    },
    []
  );

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.text}>{visibleWidth} px</Text>
      <Text style={styles.text}>{priority}</Text>
      <Text style={styles.text}>{widthPercent}</Text>

      <View style={[styles.sliderTrack, ]}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sliderHandle, sliderStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  text: {
    fontSize: 24,
    color: '#001a72',
    marginBottom: 20,
  },
  sliderTrack: {
    width: SLIDER_WIDTH + 30,
    height: 40,
  
    borderRadius: 25,
    justifyContent: 'center',
    padding: 5,
  },
  sliderHandle: {
    width: 30,
    height: 30,
    backgroundColor: '#f8f9ff',
    borderRadius: 20,
    position: 'absolute',
    left: 0,
  },
});

export default Slider;
