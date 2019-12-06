import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import {Container, Content, Text, Button} from 'native-base'
import AppHeader from '../components/AppHeader'


const PrepStartRoutine = props => {
  //const chestActivity = 'breathing'
  //const ankleActivity = 'cycling'

  const routineActivityTypes = props.routine.intervals.map(
    interval => interval.activityType
  )

  return (
    <Container>
      <Content>
      <Text style={styles.text}>Please strap your phone</Text>
          {routineActivityTypes.includes('breathing') ? (
            <Text style={styles.text}>
              to your chest for breathing intervals
            </Text>
          ) : null}
          {routineActivityTypes.includes('cycling') ? (
            <Text style={styles.text}>to your ankle for cycling intervals</Text>
          ) : null}
          {routineActivityTypes.filter(type=>type!=='breathing'&&type!=='cycling').length ? <Text style={styles.text}>
            {routineActivityTypes.includes('breathing') ||
            routineActivityTypes.includes('cycling')
              ? 'and '
              : ''}
            to your wrist{' '}
            {routineActivityTypes.includes('breathing') ||
            routineActivityTypes.includes('cycling')
              ? 'for all other intervals'
              : ''}
          </Text>: null}
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
    color: 'rgb(84, 130, 53)',
    lineHeight: 30
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
