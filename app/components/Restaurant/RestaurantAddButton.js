import React, { Component } from "react";
import AppButton from "../AppButton";
import { StyleSheet, View } from "react-native";

export default class RestaurantAddButton extends Component {
  render() {
    const { addRestaurant } = this.props;
    return (
      // <View style={styles.buttonContainer}>
      <AppButton
        bgColor="#F47B00"
        title="Agregar un Restaurante "
        action={addRestaurant}
        iconName="plus"
        iconSize={30}
        iconColor="#fff"
      />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    bottom: 0
  }
});
