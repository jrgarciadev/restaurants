import React, { Component } from "react";
import Toast from "react-native-simple-toast";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons";

class Logout extends Component {

constructor(props) {
  super(props);
  this.state = {};
}

componentDidMount() {
  firebase
  .auth()
  .signOut()
  .then(() => {
    Toast.showWithGravity(
      "La sesión ha culminado",
      Toast.LONG,
      Toast.CENTER
      );
  })
  .catch(error => {
    Toast.showWithGravity(
      "Algo a ocurrido mientras cerraba la sesión, intenta nuevamente",
      Toast.LONG,
      Toast.CENTER
      );
  });
}

render() {
  return null;
}
}

export default Logout;
