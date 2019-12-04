import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text, Button} from 'native-base'
//import {createWorkoutThunk} from '../store/workout'

const PrepStartRoutine = props => {
  //const chestActivity = 'breathing'
  //const ankleActivity = 'cycling'
  // console.log(props.routine.interval.activityType)
  return (
    <Container>
      <Content>
        {props.routine.activityType === 'breathing' ? (
          <Text>Please mount your phone on your chest</Text>
        ) : props.routine.activityType === 'cycling' ? (
          <Text>Please mount your phone on your ankle</Text>
        ) : (
          <Text>Please mount your phone on your wrist</Text>
        )}
        {/* <Button onPress={props.navigation.navigate('StartRoutineScreen')}>
          <Text>Start your workout</Text>
        </Button> */}
      </Content>
    </Container>
  )
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
//const mapDispatchToProps = {createWorkoutThunk}

export default connect(mapStateToProps)(PrepStartRoutine)
