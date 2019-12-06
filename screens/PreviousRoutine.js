//buggy?
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet} from 'react-native'
import {Container, Button, Text} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import AppHeader from '../components/AppHeader'

// import {getAllRoutinesThunk} from '../store/routines'
//import {setRoutine} from '../store/routine'
// import {getRoutineThunk} from '../store/routine'

class PreviousRoutine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //previousRoutines: [],
      selectedRoutine: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitPreviousRoutine = this.handleSubmitPreviousRoutine.bind(
      this
    )
  }
  // componentDidMount() {
  //   this.props.getAllMyRoutinesThunk()
  // }

  handleChange(value) {
    this.setState({
      selectedRoutine: value
    })
  }
  handleSubmitPreviousRoutine() {
    //this.props.setRoutine(this.state.selectedRoutine)
    // this.props.getRoutineThunk(this.state.selectedRoutine)
    this.props.navigation.navigate(
      'CreateClassScreen'
      //{
      // routine: this.state.selectedRoutine
      //}
    )
    this.setState({
      selectedRoutine: {}
    })
  }
  render() {
    const mappedRoutines = this.props.routines.map(routine => {
      return {
        label: `${routine.name}`,
        value: `${routine.id}`
      }
    })

    return (
      <Container>
        <AppHeader navigation={this.props.navigation} />
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
  routines: state.routines,
  routine: state.routine
})

const mapDispatchToProps = dispatch => ({
  // getRoutineThunk: routineId => dispatch(getRoutineThunk(routineId)),
  // getAllMyRoutinesThunk: () => dispatch(getAllRoutinesThunk())
  //setRoutine: routine => dispatch(setRoutine(routine))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousRoutine)
