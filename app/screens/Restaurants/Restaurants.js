import React, { Component } from "react";
import PreLoader from "../../components/PreLoader";
import { View, StyleSheet, FlatList, StatusBar } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import * as firebase from "firebase";
import { NavigationActions } from "react-navigation";
import RestaurantEmpty from "../../components/Restaurant/RestaurantEmpty";
import RestaurantButton from "../../components/Restaurant/RestaurantButton";
import TouchableScale from "react-native-touchable-scale";

export default class Restaurants extends Component {

constructor() {
  super();
  this.state = {
    restaurants: [],
    loaded: false,
    restaurant_logo: require("../../../assets/images/restaurant.png"),
    search: ''
  };
}

  componentDidMount () {
    const {search} = this.state;
    
    if ( ! search) {
      this.refRestaurants = firebase.database().ref().child('restaurants');
    } else {
      this._filterRestaurants(search);
    }
    
    this._loadFirebaseRestaurants();
  }

  _loadFirebaseRestaurants () {
    this.refRestaurants.on('value', snapshot => {
      let restaurants = [];
      snapshot.forEach(row => {
        restaurants.push({
          id: row.key,
          name: row.val().name,
          address: row.val().address,
          capacity: row.val().capacity,
          description: row.val().description
        })
      });

      this.setState({
        restaurants,
        loaded: true
      });
    })
  }

addRestaurant() {
  const navigateAction = NavigationActions.navigate({
    routeName: "AddRestaurant"
  });

  this.props.navigation.dispatch(navigateAction);
}

restaurantDetail(restaurant) {
  const navigateAction = NavigationActions.navigate({
    routeName: "DetailRestaurant",
    params: { restaurant }
  });

  this.props.navigation.dispatch(navigateAction);
}

renderRestaurant(restaurant) {
  return (
    <ListItem
    containerStyle={styles.item}
    titleStyle={styles.title}
    Component={TouchableScale}
    friction={90}
    tension={100}
    activeScale={0.95}
    linearGradientProps={{
      colors: ["#FF9800", "#F44336"],
      start: [1, 0],
      end: [0.2, 0]
    }}
    roundAvatar
    title={`${restaurant.name} (Capacidad: ${restaurant.capacity})`}
    leftAvatar={{ source: this.state.restaurant_logo }}
    onPress={() => this.restaurantDetail(restaurant)}
    rightIcon={{
      name: "arrow-forward",
      type: "ion-icons",
      style: styles.listIconStyle
    }}
    />
    );
}

  searchRestaurants (search) {
    this.setState({
      search: search.charAt(0).toUpperCase() + search.slice(1)
    });
    
    if (search.length >= 3) {
      this._filterRestaurants(search);
      setTimeout(() => {
        this._loadFirebaseRestaurants();
      }, 1000);
    }
  }

resetSearch() {
  this.setState({
    search: ''
  });
  this.refRestaurants = firebase.database().ref().child('restaurants');
   setTimeout(() => {
      this._loadFirebaseRestaurants();
    }, 1000);
}

  
  _filterRestaurants (search) {
    this.refRestaurants = firebase.database().ref().child('restaurants')
        .orderByChild('name')
        .startAt(search)
        .endAt(`${search}\uf8ff`);
  }


render() {
  const { loaded, restaurants } = this.state;
  if (!loaded) {
    return <PreLoader />;
  }

  const searchBar = (
    <SearchBar
        platform="android"
        placeholder='Buscar Restaurante'
        onChangeText={( text ) => this.searchRestaurants(text)}
        onClear={this.resetSearch.bind(this)}
        value={this.state.search}
      />
  )

  if (!restaurants.length) {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      { searchBar }
      <RestaurantEmpty text="No hay restaurantes disponibles" />
      <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)} />
      </View>
      );
  }

  return (
    <View style={{ flex: 1 }}>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      { searchBar }
      <FlatList
      data={restaurants}
      renderItem={data => this.renderRestaurant(data.item)}
      keyExtractor={(data) => data.id}
      />
    <RestaurantButton action={this.addRestaurant.bind(this)} type="add" />
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
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: "#FFB300"
  }
});
