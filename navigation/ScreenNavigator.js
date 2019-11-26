import {createStackNavigator} from 'react-navigation'

import SelectRoutineScreen from '../screens/SelectRoutineScreen'
import HomeScreen from '../screens/HomeScreen'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'
import StartRoutineScreen from '../screens/StartRoutineScreen'
import InProgressScreen from '../screens/InProgressScreen'

<<<<<<< HEAD
const ScreenNavigator = createStackNavigator({
  SelectRoutineScreen,
  HomeScreen,
  BuildRoutineScreen,
  StartRoutineScreen,
  InProgressScreen
},{headerMode:'none'})
=======
const ScreenNavigator = createStackNavigator(
  {
    SelectRoutineScreen,
    BuildRoutineScreen
  },
  {headerMode: 'none'}
)
>>>>>>> master

export default ScreenNavigator
