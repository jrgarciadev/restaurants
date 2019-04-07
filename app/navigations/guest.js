import { createStackNavigator, createAppContainer } from "react-navigation";
import StartScreen from "../screens/Start";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";

const AppNavigator = createStackNavigator(
  {
    Start: {
      screen: StartScreen
    },
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    }
  },
  {
    initialRouteName: "Start",
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#F47B00"
      }
    }
  }
);

export default createAppContainer(AppNavigator);
