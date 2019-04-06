import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Esta es mi primera app en Expo!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfb3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#fff',
  }
});
