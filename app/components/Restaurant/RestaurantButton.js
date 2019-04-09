import React, { Component } from "react";
import AppButton from "../AppButton";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export default class RestaurantAddButton extends Component {
  render() {
    const { type, action } = this.props;
    switch (type) {
      case "add":
        return <ActionButton buttonColor="#F47B00" onPress={action} />;
        break;
      case "edit":
        return (
          <ActionButton
            buttonColor="#3498db"
            onPress={action}
            icon={
              <Icon
                name="md-create"
                style
                size={25}
                style={styles.actionButtonIcon}
              />
            }
          />
        );
        break;
      default:
        return <ActionButton buttonColor="#F47B00" onPress={action} />;
        break;
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: "#F47B00"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
