import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";
import DetailRestaurantScreen from "../screens/Restaurants/DetailRestaurant";
import EditRestaurantScreen from "../screens/Restaurants/EditRestaurant";
import ProfileScreen from "../screens/Profile";
import LogoutScreen from "../screens/Logout";

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerTintColor: "#353535",
    headerStyle: {
      backgroundColor: "#fff"
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
  onPress={() => navigation.toggleDrawer()}
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
      drawerLabel: "Restaurantes",
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-home" size={24} style={{ color: tintColor }} />
        ),
      headerLeft: (
        <Icon
        color="#353535"
        style={{ marginLeft: 20 }}
        name="md-menu"
        size={20}
        onPress={() => navigation.toggleDrawer()}
        />
        )
    })
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Agregar restaurante",
      headerRight: (
        <Icon
        color="#353535"
        style={{ marginRight: 20 }}
        name="md-home"
        size={20}
        onPress={() => navigation.navigate("ListRestaurants")}
        />
        ),
      headerLeft: (
        <Icon
        color="#353535"
        style={{ marginLeft: 20 }}
        name="md-menu"
        size={20}
        onPress={() => navigation.toggleDrawer()}
        />
        )
    })
  },
  DetailRestaurant: {
    screen: DetailRestaurantScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Detalle del restaurante",
      headerRight: (
        <Icon
        color="#353535"
        style={{ marginRight: 20 }}
        name="md-home"
        size={20}
        onPress={() => navigation.navigate("ListRestaurants")}
        />
        ),
      headerLeft: (
        <Icon
        color="#353535"
        style={{ marginLeft: 20 }}
        name="md-menu"
        size={20}
        onPress={() => navigation.toggleDrawer()}
        />
        )
    })
  },
  EditRestaurant: {
    screen: EditRestaurantScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Detalle del restaurante",
      headerRight: (
        <Icon
        color="#353535"
        style={{ marginRight: 20 }}
        name="md-home"
        size={20}
        onPress={() => navigation.navigate("ListRestaurants")}
        />
        )
    })
  }
},
defaultNavigationOptions
);


const profileScreenStack = createStackNavigator(
{
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Perfil",
      headerRight: (
        <Icon
        color="#353535"
        style={{ marginRight: 20 }}
        name="md-home"
        size={20}
        onPress={() => navigation.navigate("ListRestaurants")}
        />
        ),
      headerLeft: (
        <Icon
        color="#353535"
        style={{ marginLeft: 20 }}
        name="md-menu"
        size={20}
        onPress={() => navigation.toggleDrawer()}
        />
        )
    })
  }
},
defaultNavigationOptions
);

const logoutScreenStack = createStackNavigator({
  LogoutScreen: {
    screen: LogoutScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: "Cerrar Sesión",
      drawerIcon: ({ tintColor }) => (
        <Icon name="sign-out" size={24} style={{ color: tintColor }} />
        )
    })
  }
});

const loggedDrawerNavigation = createDrawerNavigator(
{
  RestaurantScreen: {
    screen: restaurantsScreenStack
  },
  ProfileScreen: {
    screen: profileScreenStack
  },
  LogoutScreen: {
    screen: logoutScreenStack
  }
},
{
  drawerBackgroundColor: "#fff",
  contentOptions: {
    activeTintColor: "#F47B00",
    activeBackgroundColor: "transparent",
    inactiveTintColor: "black",
    itemsContainerStyle: {
      marginVertical: 0
    }
  }
}
);

export default createAppContainer(loggedDrawerNavigation);
