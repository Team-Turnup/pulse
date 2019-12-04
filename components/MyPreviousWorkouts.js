import React from 'react'
import {StyleSheet, View, Label} from 'react-native'
import activityTypes from '../assets/images/activityTypes'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Card,
  CardItem
} from 'native-base'

export default class MyPreviousWorkouts extends React.Component {
  constructor() {
    super()
    this.state = {showAll: false}
  }

  render() {
    return (
      <Content style={{margin: 15, }}>
        <Card style={{borderRadius: 10, overflow: 'hidden', padding: 15}}>
            <Text style={{fontWeight: '600', marginBottom: 10}}>My Previous Solo Workouts</Text>
          {this.state.showAll
            ? this.props.workouts.map(workout => {
                return (
                  <Content key={workout.id} style={{width: '100%'}}>
                    <Text>
                      {activityTypes[workout.routine.activityType].icon} -{' '}
                      {workout.routine.name} - {workout.timestamp.split('T')[0]}
                    </Text>
                  </Content>
                )
              })
            : this.props.workouts.slice(0, 5).map(workout => {
                return (
                  <Content key={workout.id} style={{width: '100%'}}>
                    <Text>
                      {activityTypes[workout.routine.activityType].icon} -{' '}
                      {workout.routine.name} - {workout.timestamp.split('T')[0]}
                    </Text>
                  </Content>
                )
              })}
          <Content>
            <Text
              onPress={() => {
                this.setState(prevState => ({showAll: !prevState.showAll}))
              }}
            >
              {this.props.workouts.length > 5
                ? this.props.workouts.length> 0
                ? this.state.showAll
                  ? 'Show 5 most recent workouts'
                  : 'Show all'
                : '- No previous solo workouts' : ''}
            </Text>
          </Content>
        </Card>
      </Content>
    )
  }
}
