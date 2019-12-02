import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text} from 'native-base'
// import {setWorkoutThunk} from '../store/workout';

const _class = {
  id: 1,
  name: 'test',
  when: Date.now() + 10000
}

const user = {
  id: 1
}

//maybe rename to UpdateRoutineScreen
class FollowerWaitClassScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: Math.floor((_class.when - Date.now()) / 1000),
      clearCountdown: null
    }
  }

  componentDidMount() {
    let {message} = this.state
    if (typeof message === 'number' && message > 0) {
      const clearCountdown = setInterval(() => {
        if (message > 1) {
          message = Math.floor((_class.when - Date.now()) / 1000)
        } else {
          clearInterval(this.state.clearCountdown)
          message = 'Waiting for leader to start class...'
        }
        this.setState({message})
      }, 1000)
      this.setState({clearCountdown})
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.countdown}>
            <Text style={styles.text}>{this.state.message}</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  countdown: {
    marginTop: '60%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 75,
    color: 'blue'
  }
})

const mapStateToProps = ({routine}) => ({routine})

export default connect(mapStateToProps)(FollowerWaitClassScreen)
