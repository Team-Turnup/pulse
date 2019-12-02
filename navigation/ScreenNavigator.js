import {createStackNavigator} from 'react-navigation'

import SelectRoutineScreen from '../screens/SelectRoutineScreen'
import HomeScreen from '../screens/HomeScreen'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'
import StartRoutineScreen from '../screens/StartRoutineScreen'
import InProgressScreen from '../screens/InProgressScreen'
import SignupScreen from '../screens/SignupScreen'
import ClassesScreen from '../screens/ClassesScreen'
import CreateClassScreen from '../screens/CreateClassScreen'
import PreviousRoutine from '../screens/PreviousRoutine'
import UserWaitingScreen from '../screens/UserWaitingScreen'
import TrainerWaitingScreen from '../screens/TrainerWaitingScreen'
import BuildClassScreen from '../screens/BuildClassScreen'



const ScreenNavigator = createStackNavigator({
  SelectRoutineScreen,
  HomeScreen,
  BuildRoutineScreen,
  StartRoutineScreen,
  InProgressScreen,
  SignupScreen,
  ClassesScreen,
  PreviousRoutine,
  UserWaitingScreen,
  TrainerWaitingScreen,
  CreateClassScreen,
  BuildClassScreen

},{headerMode:'none'})

export default ScreenNavigator
