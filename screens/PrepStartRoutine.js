import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text, Button} from 'native-base'

const PrepStartRoutine = props => {
  //const chestActivity = 'breathing'
  //const ankleActivity = 'cycling'

  return (
    <Container
    // style={{marginTop: 15}}
    >
      <Content>
        {props.routine.activityType === 'breathing' ? (
<Text style={styles.text}>Please strap your phone{"\n"}to your chest</Text>
        ) : props.routine.activityType === 'cycling' ? (
          <Text style={styles.text}>Please strap your phone{"\n"}to your ankle</Text>
        ) : props.routine.activityType === 'combo' ? (
          <Text style={styles.text}>
            Please strap your phone{"\n"}to your chest for breathing intervals,{"\n"}to your ankle for
            cycling intervals,{"\n"}and to your wrist for all other activities
          </Text>
        ) : (
          <Text style={styles.text}>Please mount your phone on your wrist</Text>
        )}
      </Content>
    </Container>
  )
}

// props.routine.activityType === 'combo'
// props.routine.intervals  if you want to search through this array

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'rgb(84, 130, 53)'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    color: 'rgba(255,255,255, 0.9)',
    backgroundColor: 'gray'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  message: {
    fontSize: 10,
    textAlign: 'center'
  },
  item: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  checkBox: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  name: {
    textAlign: 'right'
  },
  sectionHeader: {
    width: '100%',
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center'
  },
  barGraphic: {
    marginTop: 20,
    marginBottom: 20
  }
})

const mapStateToProps = ({routine}) => ({routine})

export default connect(mapStateToProps)(PrepStartRoutine)
