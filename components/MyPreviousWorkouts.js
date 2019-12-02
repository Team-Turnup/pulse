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
      <Card>
        <CardItem header>
          <Title>My Previous Workouts</Title>
        </CardItem>
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
          {this.state.showAll ? 'Show 5 most recent workouts' : 'Show all'}
        </Text>

            </Content>
      </Card>
    )
  }
}
