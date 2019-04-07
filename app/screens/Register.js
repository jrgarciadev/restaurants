import React, { Component } from "react";
import { View } from "react-native";
import AppButton from "../components/AppButton";
import { Card } from "react-native-elements";
import Toast from "react-native-simple-toast";
import t from "tcomb-form-native";
import FormValidation from "../utils/validation";
import * as firebase from "firebase";

const Form = t.form.Form;

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: "",
        password: ""
      }
    };

    this.samePassword = t.refinement(t.String, s => {
      return s === this.state.user.password;
    });

    this.user = t.struct({
      email: FormValidation.email,
      password: FormValidation.password,
      password_confirmation: this.samePassword
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
          error: "Clave Incorrecta",
          password: true,
          secureTextEntry: true
        },
        password_confirmation: {
          help: "Repite tu clave",
          error: "Las claves no coinciden",
          password: true,
          secureTextEntry: true
        }
      }
    };
    this.validate = null;
  }

  register() {
    if (this.validate) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.validate.email,
          this.validate.password
        )
        .then(() => {
          Toast.showWithGravity(
            "Registro Correcto, bienvenido",
            Toast.LONG,
            Toast.CENTER
          );
        })
        .catch(error => {
          Toast.showWithGravity(error.message, Toast.LONG, Toast.CENTER);
        });
    }
  }

  onChange(user) {
    this.setState({ user });
    this.validate = this.refs.form.getValue();
  }

  render() {
    return (
      <View>
        <Card wrapperStyle={{ paddingLeft: 10 }} title="Registro">
          <Form
            ref="form"
            type={this.user}
            options={this.options}
            onChange={v => this.onChange(v)}
            value={this.state.user}
          />
          <AppButton
            bgColor="#F47B00"
            title="Registrarme "
            action={this.register.bind(this)}
            iconName="user-plus"
            iconSize={30}
            iconColor="#fff"
          />
        </Card>
      </View>
    );
  }
}
