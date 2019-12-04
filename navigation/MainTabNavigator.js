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
import UserWaitingScreen from '../screens/UserWaitingScreen'
import ClassesScreen from '../screens/ClassesScreen'
import CreateClassScreen from '../screens/CreateClassScreen'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'
import TrainerWaitingScreen from '../screens/TrainerWaitingScreen'
import TrainerWorkoutScreen from '../screens/TrainerWorkoutScreen'
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

const HomeWorkoutsStack = createStackNavigator({
  HomeWorkoutsScreen,
  SelectRoutineScreen,
  PreviousRoutine,
  BuildRoutineScreen
})

HomeWorkoutsStack.navigationOptions = {
  tabBarLabel: 'Solo Workouts',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-walk` : 'md-walk'}
    />
  )
}

HomeWorkoutsStack.path = ''

const HomeClassesStack = createStackNavigator({
  HomeClassesScreen,
  ClassesScreen,
  UserWaitingScreen,
  CreateClassScreen,
  TrainerWaitingScreen,
  TrainerWorkoutScreen
})

HomeClassesStack.navigationOptions = {
  tabBarLabel: 'Classes',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-people` : 'md-people'}
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

const tabNavigator = createBottomTabNavigator(
  {
    // LoginStack,
    HomeWorkoutsStack,
    HomeClassesStack,
    SettingsStack
    // TrainerWorkScreen,
    // TakePhotoStack
  },
  {headerMode: 'screen'}
)

tabNavigator.path = ''

export default tabNavigator
