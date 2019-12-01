import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import CommunityScreen from '../screens/CommunityScreen'
import HistoryScreen from '../screens/HistoryScreen'
import SelectRoutineScreen from '../screens/SelectRoutineScreen'
//delete the select workout screen after development.
import PreviousRoutine from '../screens/PreviousRoutine'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'
import InProgressScreen from '../screens/InProgressScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import ClassesSearch from '../screens/ClassesScreen'
import UserWaitingScreen from '../screens/UserWaitingScreen'
import TrainerWaitingScreen from '../screens/TrainerWaitingScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {}
})

const InProgressStack = createStackNavigator({InProgress: InProgressScreen})

InProgressStack.navigationOptions = {
  tabBarLabel: 'InProgress',
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

LoginStack.path = ''

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  }
  // config
)

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

const CommunityStack = createStackNavigator({Settings: CommunityScreen}, config)

CommunityStack.navigationOptions = {
  tabBarLabel: 'Community',
  TabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

CommunityStack.path = ''

const HistoryStack = createStackNavigator(
  {
    Settings: HistoryScreen
  },
  config
)

HistoryStack.navigationOptions = {
  tabBarLabel: 'History',
  TabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

HistoryStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
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

// const AccelerometerStack = createStackNavigator(
//   { Settings: Accelerometer },
//   config
// );

// AccelerometerStack.navigationOptions = {
//   tabBarLabel: 'Accelerometer',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

// AccelerometerStack.path = '';

// const SelectWorkoutStack = createStackNavigator(
//   //{ Settings: PreviousRoutine },
//   { Settings: SelectRoutineScreen },

//   config
// );

// SelectWorkoutStack.navigationOptions = {
//   //tabBarLabel: 'PreviousRoutine',
//   tabBarLabel: 'SelectWorkout',

//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

// SelectWorkoutStack.path = '';

const AppStack = createStackNavigator({Home: HomeScreen})
const AuthStack = createStackNavigator({Login: LoginScreen})

const tabNavigator = createBottomTabNavigator(
  {
    TrainerWaitingScreen,
    //HomeStack,
    //LoginStack,
    HomeScreen,
    LoginScreen,
    HistoryStack,
    SettingsStack,
    // AccelerometerStack,
    // SelectWorkoutStack,
    // BuildRoutineScreen: BuildRoutineScreen,
    //PreviousRoutine
    // InProgressStack,
    AuthLoading: AuthLoadingScreen
    // App: AppStack,
    // Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

tabNavigator.path = ''

export default tabNavigator
