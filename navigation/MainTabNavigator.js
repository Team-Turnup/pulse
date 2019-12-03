import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import OptionsScreen from '../screens/OptionsScreen'
import TrainerWorkScreen from '../screens/TrainerWorkoutScreen'
import TakePhotoScreen from '../screens/TakePhotoScreen'
const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {}
})

// const TakePhotoStack = createStackNavigator({TakePhoto: TakePhotoScreen})

// TakePhotoStack.navigationOptions = {
//   tabBarLabel: 'TakePhoto',
//   tabBarIcon: ({focused}) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   )
// }

const LoginStack = createStackNavigator({Login: LoginScreen})

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

const HomeStack = createStackNavigator({HomeScreen})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

HomeStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: OptionsScreen
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

SettingsStack.path = ''

const tabNavigator = createBottomTabNavigator({
  LoginStack,
  HomeStack,
  SettingsStack,
  TrainerWorkScreen,
  // TakePhotoStack
})

tabNavigator.path = ''

export default tabNavigator
