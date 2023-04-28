import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

const HorizontalNumberPicker = ({ values, width, itemWidth, onValueChange }) => {
  const [selected, setSelected] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;

  const middleIndex = Math.floor(values.length / 2);
  const ITEM_SIZE = itemWidth;
  const ITEM_SPACING = (width - ITEM_SIZE) / 2;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current.scrollTo({
      x: middleIndex * ITEM_SIZE,
      animated: false,
    });
  }, []);

  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(scrollPosition / ITEM_SIZE);
    const newValue = values[selectedIndex];

    if (selected !== newValue) {
      setSelected(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: onScroll },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
      >
        {values.map((value, index) => {
          const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          return (
            <View key={index} style={[styles.numberContainer, { width: ITEM_SIZE }]}>
              <Animated.Text style={[styles.numberText, { opacity, transform: [{ scale }] }]}>{value}</Animated.Text>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginRight: 30,
  },
});

export default HorizontalNumberPicker;
