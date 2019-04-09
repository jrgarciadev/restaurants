import React, { Component } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import RestaurantRating from "./RestaurantRating";
import RestaurantButton from "./RestaurantButton";
import AppButton from "../AppButton";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { editRestaurant, goHome, restaurant } = this.props;
    return (
      <Card
        title={restaurant.name}
        image={require("../../../assets/images/restaurant.png")}
      >
        <RestaurantRating restaurantId={restaurant.id} />
        <Text style={{ marginBottom: 20, marginTop: 20 }}>
          {restaurant.description}
        </Text>
        <AppButton
          bgColor="#3498db"
          title="Editar Restaurante "
          action={editRestaurant}
          iconName="md-create"
          iconSize={30}
          iconColor="#fff"
        />
        <AppButton
          bgColor="#3498db"
          title="Volver "
          action={goHome}
          iconName="md-arrow-back"
          iconSize={30}
          iconColor="#fff"
        />
      </Card>
    );
  }
}

export default Restaurant;
