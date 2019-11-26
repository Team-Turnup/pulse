import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import {setWorkoutThunk} from '../store/workout';

//maybe rename to UpdateRoutineScreen
class StartRoutineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 4, clearCountdown: null}
  }

  componentDidMount() {
      const clearCountdown = setInterval(() => {
          let {count} = this.state
          if (count>1) {
              count=count-1
          } else {
              clearInterval(this.state.clearCountdown)
              count='Go!'
              this.props.navigation.navigate('InProgressScreen')
        }
        this.setState({count})
      }, 60000/this.props.routine.intervals[0].cadence)
      this.setState({clearCountdown})
      this.props.setWorkoutThunk(this.props.routine)
  }

  render() {
    return (
      <Container>
        <Content>
            <View style={styles.countdown}>
            <Text style={styles.text}>{this.state.count}</Text>
            </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  countdown: {
      marginTop: "60%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: 75,
    color: "blue"
  }
});

const mapStateToProps = ({routine}) => ({routine})

export default connect(mapStateToProps)(StartRoutineScreen);
