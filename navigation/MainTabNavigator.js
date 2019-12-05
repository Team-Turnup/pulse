import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import OptionsScreen from '../screens/OptionsScreen'
import HomeClassesScreen from '../screens/HomeClassesScreen'
import HomeWorkoutsScreen from '../screens/HomeWorkoutsScreen'
import SelectRoutineScreen from '../screens/SelectRoutineScreen'
import UserWaitingScreen from '../screens/UserWaitingScreen'
import ClassesScreen from '../screens/ClassesScreen'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'
import BuildClassScreen from '../screens/BuildClassScreen'
import TrainerWaitingScreen from '../screens/TrainerWaitingScreen'
import TrainerWorkoutScreen from '../screens/TrainerWorkoutScreen'
import StartRoutineScreen from '../screens/StartRoutineScreen'
import PreviousWorkoutScreen from '../screens/PreviousWorkoutScreen'
import OptionUserInfoScreen from '../screens/OptionsUserInfoScreen'
import OptionsCadenceVibrationScreen from '../screens/OptionsCadenceVibrationScreen'
import OptionsVisualSettingsScreen from '../screens/OptionsVisualSettingsScreen'
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
  BuildRoutineScreen,
  StartRoutineScreen,
  TrainerWaitingScreen,
  TrainerWorkoutScreen,
  PreviousWorkoutScreen
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
  BuildClassScreen,
  TrainerWaitingScreen,
  BuildRoutineScreen,
  SelectRoutineScreen
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
    Settings: OptionsScreen,
    UserInfo:OptionUserInfoScreen,
    CadenceVibration: OptionsCadenceVibrationScreen,
    VisualSettings:OptionsVisualSettingsScreen
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
    SettingsStack,
    // TrainerWorkScreen,
    // TakePhotoStack
  },
  {headerMode: 'screen'}
)

tabNavigator.path = ''

export default tabNavigator
