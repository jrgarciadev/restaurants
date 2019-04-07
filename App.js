import React from 'react';
import Start from './app/screens/Start';
import GuestNavigation from './app/navigations/guest';
import firebaseConfig from './app/utils/firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
       <GuestNavigation/>
    );
  }
}


