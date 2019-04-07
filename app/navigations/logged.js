import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#F47B00"
    },
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
};
const leftIcon = ({ navigation, icon }) => (
  <Icon
    name={icon}
    style={{ marginLeft: 5 }}
    size={20}
    color="white"
    onPress={() => navigation.navigate("DrawerOpen")}
  />
);

const rightIcon = ({ navigation, icon }) => {
  return (
    <Icon
      name={icon}
      style={{ marginLeft: 20 }}
      size={20}
      color="white"
      onPress={() => navigation.navigate("ListRestaurants")}
    />
  );
};

const restaurantsScreenStack = createStackNavigator(
  {
    ListRestaurants: {
      screen: RestaurantsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Restaurantes",
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" size={24} style={{ color: tintColor }} />
        ),
        headerLeft: leftIcon(navigation, "bars")
      })
    }
  },
  defaultNavigationOptions
);

const loggedDrawerNavigation = createDrawerNavigator(
  {
    RestaurantScreen: {
      screen: restaurantsScreenStack
    }
  },
  {
    drawerBackgroundColor: "#F47B00",
    contentOptions: {
      activeTintColor: "white",
      activeBackgroundColor: "transparent",
      inactiveTintColor: "white",
      itemsContainerStyle: {
        marginVertical: 0
      }
    }
  }
);

export default createAppContainer(loggedDrawerNavigation);
