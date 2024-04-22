import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableText = ({ text, numberOfLines }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullHeight = useRef(0);

  const onTextLayout = (e) => {
    if (e.nativeEvent && e.nativeEvent.layout) {
      const { height } = e.nativeEvent.layout;
      if (!isExpanded && fullHeight.current === 0 && height) {
        fullHeight.current = height;  
      }
    }
  };
  

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Text
        style={styles.text}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
      <TouchableOpacity onPress={toggleExpanded}>
        <Text style={styles.seeMoreText}>
          {isExpanded ? 'See less' : 'See more'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.darkgray,
    fontSize: SIZES.medium,
  },
  seeMoreText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: 'bold',
    marginTop: 5,
  }
});

export default ExpandableText;
