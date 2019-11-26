import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Item,
  Picker,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Text
} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import {getAllRoutinesThunk} from '../store/routines'
import {setRoutine} from '../store/routine'
//import { getRoutineThunk } from '../store/routines';
//import { updateRoutineThunk } from '../store/routines';

class PreviousRoutine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      //previousRoutines: [],
      selectedRoutine: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitPreviousRoutine = this.handleSubmitPreviousRoutine.bind(
      this
    )
  }
  componentDidMount() {
    this.props.getAllRoutinesThunk()
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }
  handleChange(value) {
    this.setState({
      selectedRoutine: value
    })
  }
  handleSubmitPreviousRoutine() {
    this.props.setRoutine(this.state.selectedRoutine)
    //this.props.updateRoutineThunk();
    this.props.navigation.navigate('BuildRoutineScreen')
    this.setState({
      selectedRoutine: {}
    })
  }
  render() {
    const mappedRoutines = this.props.routines.map(routine => {
      return {
        label: `${routine.name}`,
        value: `${routine.name}`
      }
    })
    return (
      <Container>
        <RNPickerSelect
          onValueChange={value => this.handleChange(value)}
          items={[...mappedRoutines]}
        />
        <Button
          bordered
          style={styles.button}
          onPress={() => this.handleSubmitPreviousRoutine()}
        >
          <Text>Finalize Selection</Text>
        </Button>
      </Container>

      //     <View style={{marginTop: 22}}>
      //       <Modal
      //         animationType="slide"
      //         transparent={false}
      //         visible={this.state.modalVisible}
      //         onRequestClose={() => {
      //           Alert.alert('Modal has been closed.')
      //         }}
      //       >
      //         <View style={{marginTop: 22}}>
      //           <View>
      //             <Header>
      //               <Text style={styles.header}>
      //                 Select From Your Previous Routines
      //               </Text>
      //             </Header>
      //             <RNPickerSelect
      //               onValueChange={value => this.handleChange(value)}
      //               items={[...mappedRoutines]}
      //             />
      //             <Button
      //               bordered
      //               style={styles.button}
      //               onPress={() => this.handleSubmitPreviousRoutine()}
      //             >
      //               <Text>Finalize Selection</Text>
      //             </Button>
      //             <TouchableHighlight
      //               onPress={() => {
      //                 this.setModalVisible(!this.state.modalVisible)
      //               }}
      //             >
      //               <Text>Hide Modal</Text>
      //             </TouchableHighlight>
      //           </View>
      //         </View>
      //       </Modal>
      //       <Button
      //         style={styles.button}
      //         onPress={() => {
      //           this.setModalVisible(true)
      //         }}
      //       >
      //         <Text>Select From Previous Routine</Text>
      //       </Button>
      //     </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  routines: state.routines
})

const mapDispatchToProps = dispatch => ({
  //getRoutineThunk: routineId => dispatch(getRoutineThunk(routineId)),
  //updateRoutineThunk: routine => dispatch(updateRoutineThunk(routine))
  getAllRoutinesThunk: () => dispatch(getAllRoutinesThunk()),
  setRoutine: routine => dispatch(setRoutine(routine))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousRoutine)
