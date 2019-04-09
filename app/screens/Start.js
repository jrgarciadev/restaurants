import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import AppButton from "../components/AppButton";
import { NavigationActions } from "react-navigation";
import Toast from "react-native-simple-toast";
import facebook from "../utils/facebook";
import * as firebase from "firebase";

export default class Start extends Component {
  static navigationOptions = {
    title: "JRFoods",
    headerTintColor: "#353535",
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  login() {
    const navigateAction = NavigationActions.navigate({
      routeName: "Login"
    });
    this.props.navigation.dispatch(navigateAction);
  }

  register() {
    const navigateAction = NavigationActions.navigate({
      routeName: "Register"
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async facebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      facebook.config.application_id,
      { permissions: facebook.config.permissions }
    );

    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credentials)
        .catch(error => {
          Toast.showWithGravity(
            "Error accediendo con Facebook",
            Toast.LONG,
            Toast.CENTER
          );
        });
    } else if (type === "cancel") {
      Toast.showWithGravity(
        "Inicio de Sesión cancelado",
        Toast.LONG,
        Toast.CENTER
      );
    } else {
      Toast.showWithGravity("Error desconocido", Toast.LONG, Toast.CENTER);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <AppButton
          bgColor="#F47B00"
          title="Entrar "
          action={this.login.bind(this)}
          iconName="md-arrow-forward"
          iconSize={30}
          iconColor="#fff"
        />
        <AppButton
          bgColor="#F47B00"
          title="Registrarme "
          action={this.register.bind(this)}
          iconName="md-person-add"
          iconSize={30}
          iconColor="#fff"
        />
        <AppButton
          bgColor="#3b5998"
          title="Facebook "
          action={this.facebook.bind(this)}
          iconName="logo-facebook"
          iconSize={30}
          iconColor="#fff"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 10
  }
});
