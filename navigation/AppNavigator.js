import React from 'react'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import ScreenNavigator from './ScreenNavigator'
import SignupScreen from '../screens/SignupScreen'
// import AuthLoadingScreen from '../screens/AuthLoadingScreen'
// import LoginScreen from '../screens/LoginScreen'
// import HomeScreen from '../screens/HomeScreen'

// const AppStack = createStackNavigator({Home: HomeScreen})
// const AuthStack = createStackNavigator({Login: LoginScreen})

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Main: MainTabNavigator,
      ScreenNavigator
      // AuthLoading: AuthLoadingScreen,
      // App: AppStack,
      // Auth: AuthStack

      //SignupScreen
    }
    // {
    //   initialRouteName: 'AuthLoading'
    // }
  )
)
