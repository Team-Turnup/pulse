import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Container, Text, Content, Card, CardItem, Button} from 'native-base'
import {connect} from 'react-redux'
import AppHeader from '../components/AppHeader'

class PreviousWorkoutScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
        <Container >
            <AppHeader />
            <Text>Previous workout screen</Text>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 5,
    height: 30,
    width: '30%',
    backgroundColor: 'rgb(84, 130, 53)'
  },
  col: {
    width: '50%',
    height: 35,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    margin: 0,
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    width: '100%',
    height: 105,
    display: 'flex',
    flexDirection: 'row'
  }
})

const mapStateToProps = ({workout}) => ({workout})

export default connect(mapStateToProps)(PreviousWorkoutScreen)
