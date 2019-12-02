import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import CommunityScreen from '../screens/CommunityScreen'
import HistoryScreen from '../screens/HistoryScreen'
//delete the select workout screen after development.
import PreviousRoutine from '../screens/PreviousRoutine'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'
import InProgressScreen from '../screens/InProgressScreen'
import LoginScreen from '../screens/LoginScreen'
import ClassesScreen from '../screens/ClassesScreen'
import CreateClassScreen from '../screens/CreateClassScreen'
import BuildClassScreen from '../screens/BuildClassScreen'
import OptionsScreen from '../screens/OptionsScreen'
import TrainerWorkScreen from '../screens/TrainerWorkoutScreen'
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
  ClassesScreen,
  HomeStack,
  // SettingsStack,
  // AccelerometerStack,
  // SelectWorkoutStack,
  BuildRoutineScreen,
  PreviousRoutine,
  CreateClassScreen,
  // InProgressStack,
  BuildClassScreen,
  TrainerWorkScreen

})

tabNavigator.path = ''

export default tabNavigator
