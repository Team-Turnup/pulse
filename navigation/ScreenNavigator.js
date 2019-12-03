import {createStackNavigator} from 'react-navigation'

import SelectRoutineScreen from '../screens/SelectRoutineScreen'
import HomeScreen from '../screens/HomeScreen'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'
import StartRoutineScreen from '../screens/StartRoutineScreen'
import InProgressScreen from '../screens/InProgressScreen'
import ClassesScreen from '../screens/ClassesScreen'
import CreateClassScreen from '../screens/CreateClassScreen'
import PreviousRoutine from '../screens/PreviousRoutine'
import UserWaitingScreen from '../screens/UserWaitingScreen'
import TrainerWaitingScreen from '../screens/TrainerWaitingScreen'
import BuildClassScreen from '../screens/BuildClassScreen'
import LoginScreen from '../screens/LoginScreen'



const ScreenNavigator = createStackNavigator({
  SelectRoutineScreen,
  HomeScreen,
  BuildRoutineScreen,
  StartRoutineScreen,
  InProgressScreen,
  ClassesScreen,
  PreviousRoutine,
  UserWaitingScreen,
  TrainerWaitingScreen,
  CreateClassScreen,
  BuildClassScreen,
  LoginScreen

},{headerMode:'none'})

export default ScreenNavigator
