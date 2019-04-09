import React, { Component } from "react";
import { ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";
import Restaurant from "../../components/Restaurant/Restaurant";
class DetailRestaurant extends Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      restaurant: params.restaurant
    };
  }

  editRestaurant() {}

  goHome() {}

  render() {
    const { restaurant } = this.state;
    return (
      <ScrollView>
        <Restaurant
          goHome={this.goHome.bind(this)}
          editRestaurant={this.editRestaurant.bind(this)}
          restaurant={restaurant}
        />
      </ScrollView>
    );
  }
}

export default DetailRestaurant;