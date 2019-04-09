import React, { Component } from "react";
import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default class PreLoader extends Component {
  render() {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator color="#F47B00" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    backgroundColor: "rgba(189,189,189,0.14)"
  }
});
