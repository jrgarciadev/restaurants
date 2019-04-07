import React, { Component } from "react";
import { View } from "react-native";
import AppButton from "../components/AppButton";
import t from "tcomb-form-native";
import FormValidation from "../utils/validation";
import { Card } from "react-native-elements";
import * as firebase from "firebase";
import Toast from "react-native-simple-toast";

const Form = t.form.Form;

export default class Login extends Component {
  constructor() {
    super();

    this.user = t.struct({
      email: FormValidation.email,
      password: FormValidation.password
    });

    this.options = {
      fields: {
        email: {
          help: "Introduce tu correo",
          error: "Correo Incorrecto",
          autoCapitalize: "none"
        },
        password: {
          help: "Introduce tu clave",
          error: "Clave Incorrecto",
          password: true,
          secureTextEntry: true
        }
      }
    };
  }

  login() {
    const validate = this.refs.form.getValue();
    if (validate) {
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          Toast.showWithGravity("Bienvenido", Toast.LONG, Toast.CENTER);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            Toast.showWithGravity(
              "Password Incorrecto",
              Toast.LONG,
              Toast.CENTER
            );
          } else {
            Toast.showWithGravity(errorMessage, Toast.LONG, Toast.CENTER);
          }
        });
    }
  }

  render() {
    return (
      <View>
        <Card wrapperStyle={{ paddingLeft: 10 }} title="Inciar Sesión">
          <Form ref="form" type={this.user} options={this.options} />
          <AppButton
            bgColor="#F47B00"
            title="Login "
            action={this.login.bind(this)}
            iconName="sign-in"
            iconSize={30}
            iconColor="#fff"
          />
        </Card>
      </View>
    );
  }
}
