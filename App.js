import React from "react";
import Start from "./app/screens/Start";
import PreLoader from "./app/components/PreLoader";
import { Text } from "react-native-elements";
import LoggedNavigation from "./app/navigations/logged";
import GuestNavigation from "./app/navigations/guest";
import firebaseConfig from "./app/utils/firebase";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      loaded: false
    };
  }

  async componentDidMount() {
    // firebase.auth().signOut();
    await firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.setState({
          isLogged: true,
          loaded: true
        });
      } else {
        this.setState({
          isLogged: false,
          loaded: true
        });
      }
    });
  }
  render() {
    const { isLogged, loaded } = this.state;
    if (!loaded) {
      return <PreLoader />;
    }

    if (isLogged) {
      return <LoggedNavigation />;
    } else {
      return <GuestNavigation />;
    }
  }
}
