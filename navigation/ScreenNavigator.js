import {createStackNavigator} from 'react-navigation'

import InProgressScreen from '../screens/InProgressScreen'
import SelectRoutineScreen from '../screens/SelectRoutineScreen'
import HomeScreen from '../screens/HomeScreen'
import BuildRoutineScreen from '../screens/BuildRoutineScreen'

const ScreenNavigator = createStackNavigator(
  {
    SelectRoutineScreen,
    //HomeScreen,
    BuildRoutineScreen
  },
  {headerMode: 'none'}
)

export default ScreenNavigator
