import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";
import DetailRestaurantScreen from "../screens/Restaurants/DetailRestaurant";
import EditRestaurantScreen from "../screens/Restaurants/EditRestaurant";
import ProfileScreen from "../screens/Profile";
import LogoutScreen from "../screens/Logout";
import TabIcon from '../components/TabIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const restaurantsScreenStack = createStackNavigator(
{
  ListRestaurants: {
    screen: RestaurantsScreen,
    navigationOptions: {
      title:'Restaurantes',
      tabBarLabel: 'Restaurantes',
      tabBarIcon: ({ tintColor }) => (<TabIcon name='md-person' size={25} color={tintColor} />)
      
    }
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: ({ navigation }) => (
    {
      title: "Agregar restaurante",
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
    navigationOptions: {
      title: "Perfil",
      tabBarLabel: 'Perfil',
    }
  }
},
defaultNavigationOptions
);

const logoutScreenStack = createStackNavigator({
  LogoutScreen: {
    screen: LogoutScreen,
    navigationOptions: {
      tabBarLabel: 'Cerrar Sesión',
    }
  }
});


const loggedBottomNavigation = createBottomTabNavigator(
{
  Restaurants: {
    screen: restaurantsScreenStack
  },
  Profile: {
    screen: profileScreenStack
  },
  Logout: {
    screen: logoutScreenStack
  }
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Restaurants') {
          iconName = `md-home`;
        } else if (routeName === 'Profile') {
          iconName = `md-person`;
        } else if (routeName === 'Logout') {
          iconName = `md-log-out`;
        }
        return <TabIcon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
      showIcon: true
    },
  }
);

export default createAppContainer(loggedBottomNavigation);
