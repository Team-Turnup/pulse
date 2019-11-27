import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
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
import {
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryAxis,
  VictoryBrushLine
} from 'victory-native'

export default class HomeScreen extends Component {
  render() {
    let dummyData = [
      {name: 'First Workout', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Workout', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Workout', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Workout', duration: 80, date: 'Dec.13.2019'}
    ]
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Card>
            <CardItem header>
              <Title>Recent Workouts</Title>
            </CardItem>
            {dummyData.map((workout, i) => {
              return (
                <CardItem
                  button
                  key={i}
                  onPress={() =>
                    alert(
                      `Duration: ${workout.duration}\nDate: ${workout.date}`
                    )
                  }
                >
                  <Text header>{workout.name}</Text>
                </CardItem>
              )
            })}
          </Card>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() =>
              this.props.navigation.navigate('SelectRoutineScreen')
            }
          >
            <Text>Add New Workout</Text>
          </Button>
          <Button
            block
            danger
            style={{margin: 7}}
            onPress={() =>
              this.props.navigation.navigate('ClassesScreen')
            }
          >
            <Text>Join A Class</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

HomeScreen.navigationOptions = {
  title: '⚡️ Stride ⚡️',
  header: null
}
