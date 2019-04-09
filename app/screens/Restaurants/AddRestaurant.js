import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../../components/AppButton";
import * as firebase from "firebase";
import { options, Restaurant } from "../../forms/restaurant";
import t from "tcomb-form-native";
import { Card } from "react-native-elements";
const Form = t.form.Form;
import Toast from "react-native-simple-toast";

class AddRestaurant extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {
        name: "",
        address: "",
        capacity: 0,
        description: ""
      }
    };
  }

  save() {
    const validate = this.refs.form.getValue();
    if (validate) {
      let data = {};
      const key = firebase
        .database()
        .ref()
        .child("restaurants")
        .push().key;
      data[`restaurants/${key}`] = this.state.restaurant;
      firebase
        .database()
        .ref()
        .update(data)
        .then(() => {
          Toast.showWithGravity(
            "Restaurante creado exitosamente",
            Toast.LONG,
            Toast.CENTER
          );
          this.props.navigation.navigate("ListRestaurants");
        })
        .catch(error => {
          Toast.showWithGravity(error.message, Toast.LONG, Toast.CENTER);
        });
    }
  }

  onChange(restaurant) {
    this.setState({ restaurant });
  }

  render() {
    const { restaurant } = this.state;
    return (
      <View styles={styles.container}>
        <Card>
          <View>
            <Form
              ref="form"
              type={Restaurant}
              options={options}
              value={restaurant}
              onChange={v => this.onChange(v)}
            />
          </View>
          <AppButton
            bgColor="#F47B00"
            title="Agregar "
            action={this.save.bind(this)}
            iconName="plus"
            iconSize={30}
            iconColor="#fff"
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFB300",
    padding: 10
  }
});

export default AddRestaurant;
