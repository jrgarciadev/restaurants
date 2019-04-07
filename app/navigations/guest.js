import { createStackNavigator, createAppContainer } from 'react-navigation';
import StartScreen from '../screens/Start';
import LoginScreen from '../screens/Login';

const AppNavigator = createStackNavigator(
	{
	  Start: { 
	  	screen: StartScreen 
	  },
	  Login: { 
	  	screen: LoginScreen 
	  }
	},
	{
		initialRouteName: 'Start',
		defaultNavigationOptions: {
	      headerTintColor: '#fff',
	      headerStyle: {
	        backgroundColor: '#F47B00',
	      },
	    },
	    
	}
);

export default createAppContainer(AppNavigator);
