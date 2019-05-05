import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

class TabIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, color, size } = this.props;
    return (
      <View style={styles.containerDimensions}>
        <Icon name={name} size={size} color={color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 24, 
    height: 24, 
    margin: 5
  }
});

export default TabIcon;