import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import LoginScreen from '../screens/LoginScreen'
import OptionsScreen from '../screens/OptionsScreen'
import HomeClassesScreen from '../screens/HomeClassesScreen'
import HomeWorkoutsScreen from '../screens/HomeWorkoutsScreen'
import SelectRoutineScreen from '../screens/SelectRoutineScreen'
import PreviousRoutine from '../screens/PreviousRoutine'
// import TrainerWorkScreen from '../screens/TrainerWorkoutScreen'
// import TakePhotoScreen from '../screens/TakePhotoScreen'
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

// const LoginStack = createStackNavigator({Login: LoginScreen})

// LoginStack.navigationOptions = {
//   tabBarLabel: 'Login',
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

const HomeWorkoutsStack = createStackNavigator({HomeWorkoutsScreen, SelectRoutineScreen, PreviousRoutine})

HomeWorkoutsStack.navigationOptions = {
  tabBarLabel: 'Solo Workouts',
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

HomeWorkoutsStack.path = ''

const HomeClassesStack = createStackNavigator({HomeClassesScreen})

HomeClassesStack.navigationOptions = {
  tabBarLabel: 'Classes',
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

HomeClassesStack.path = ''

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
<<<<<<< HEAD
  // LoginStack,
  HomeWorkoutsStack,
  HomeClassesStack,
  SettingsStack,
  // TrainerWorkScreen,
=======
  LoginStack,
  HomeStack,
  SettingsStack
>>>>>>> master
  // TakePhotoStack
},{headerMode:'screen'})

tabNavigator.path = ''

export default tabNavigator
