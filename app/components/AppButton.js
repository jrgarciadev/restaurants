import React, { Component } from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";

export default class AppButton extends Component {
  render() {
    const { action, iconName, iconColor, title, bgColor } = this.props;
    return (
      <Button
        onPress={action}
        buttonStyle={{
          marginBottom: 5,
          backgroundColor: bgColor,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5
        }}
        icon={<Icon name={iconName} size={15} color={iconColor} />}
        title={title}
        iconRight={true}
      />
    );
  }
}
