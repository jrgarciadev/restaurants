import React, { Component } from "react";
import PreLoader from "../../components/PreLoader";
import { View, StyleSheet, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import * as firebase from "firebase";
import { NavigationActions } from "react-navigation";
import RestaurantEmpty from "../../components/Restaurant/RestaurantEmpty";
import RestaurantAddButton from "../../components/Restaurant/RestaurantAddButton";

export default class Restaurants extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      loaded: true,
      restaurant_logo: require("../../../assets/images/restaurant.png")
    };

    this.refRestaurants = firebase
      .database()
      .ref()
      .child("restaurants");
  }

  componentDidMount() {
    this.refRestaurants.on("value", snapshot => {
      let restaurants = [];
      snapshot.forEach(row => {
        restaurants.push({
          id: row.key,
          name: row.val().name,
          address: row.val().address,
          capacity: row.val().capacity,
          description: row.val().description
        });
      });

      this.setState({
        restaurants,
        loaded: true
      });
    });
  }

  addRestaurant() {
    const navigateAction = NavigationActions.navigate({
      routeName: "AddRestaurant"
    });

    this.props.navigation.dispatch(navigateAction);
  }

  restaurantDetail(restaurant) {}

  renderRestaurant(restaurant) {
    return (
      <ListItem
        containerStyle={styles.item}
        titleStyle={styles.title}
        roundAvatar
        title={`${restaurant.name} (Capacidad: ${restaurant.capacity})`}
        avatar={this.state.restaurant_logo}
        onPress={() => this.restaurantDetail(restaurant)}
        rigthIcon={{
          name: "arrow-right",
          type: "font-awesome",
          style: styles.listIconStyle
        }}
      />
    );
  }

  render() {
    const { loaded, restaurants } = this.state;
    if (!loaded) {
      return <PreLoader />;
    }

    if (!restaurants.length) {
      return (
        <View style={{ flex: 1 }}>
          <RestaurantEmpty text="No hay restaurantes disponibles" />
          <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={restaurants}
          renderItem={data => this.renderRestaurant(data.item)}
        />
        <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#fff"
  },
  listIconStyle: {
    marginRight: 10,
    fontSize: 15,
    color: "#F47B00"
  },
  item: {
    padding: 0,
    backgroundColor: "#FFB300"
  }
});
