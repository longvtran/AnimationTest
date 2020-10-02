import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, StyleSheet, Easing, View } from "react-native";
import jake from "./jake.png";

const App = () => {
  const _rotationAnimation = useRef(new Animated.Value(0)).current;
  const [_rotationOffset, set_RotationOffset] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);

  const startLoopAnimation = () => {
    _rotationAnimation.setOffset(_rotationOffset);
    Animated.loop(
      Animated.timing(_rotationAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  };

  const stopLoopAnimation = () => {
    _rotationAnimation.stopAnimation((currentValue) => {
      set_RotationOffset(currentValue);
    });
  };

  const toggleSpinning = () => {
    if (spinning) {
      stopLoopAnimation();
      setSpinning(false);
    } else {
      startLoopAnimation();
      setSpinning(true);
    }
  };

  const getRotationAnimation = () => {
    const rotate = _rotationAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return { rotate };
  };

  return (
    <View style={[styles.container]}>
      <Animated.Image
        source={require("./01.jpg")}
        style={{ transform: [getRotationAnimation()] }}
      />
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          title={spinning ? 'Turn Spinning Off' : 'Turn Spinning On'}
          onPress={() => toggleSpinning()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 64,
    paddingBottom: 32
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 16,
    width: "100%"
  },
  button: {
    width: 100
  }
});

export default App;
