import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CommunityScreen from "../screens/CommunityScreen";
import HistoryScreen from "../screens/HistoryScreen"
import Accelerometer from '../Accelerometer'

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

HomeStack.path = "";



const CommunityStack = createStackNavigator(
  { Settings: CommunityScreen },
  config
);

CommunityStack.navigationOptions = {
  tabBarLabel: "Community",
  TabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

CommunityStack.path = "";

const HistoryStack = createStackNavigator(
  {
    Settings: HistoryScreen
  },
  config
)

HistoryStack.navigationOptions = {
  tabBarLabel: "History",
  TabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
}

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const AccelerometerStack = createStackNavigator(
 { Settings: 'Accelerometer',}, config

)

AccelerometerStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

AccelerometerStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  HistoryScreen,
  CommunityStack,
  SettingsStack,
  AccelerometerStack
});

tabNavigator.path = "";

export default tabNavigator;
