import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Accordion,
  Card,
  CardItem
} from "native-base";

export default class HomeScreen extends Component {
  render() {
    let dummyData = [
      {name:'Beginner Workout', duration: '1 Hour', date:'Sept.15.2019' },
      {name:'Intermediate Workout', duration: '1 Hour', date:'Oct.4.2019' },
      {name:'Advanced Workout', duration: '1 Hour', date:'Nov.21.2019' },
      {name:' Athlete Workout', duration: '1 Hour', date:'Dec.13.2019' }
    ]
    return (
      <Container style={{ backgroundColor: "pink" }}>
        {/* <Header style={{ backgroundColor: "blue" }}></Header> */}
        <Content style={{ backgroundColor: "yellow" }}>
          <Card>
            <CardItem header>
              <Text>Recent Workouts</Text>
            </CardItem>
            {dummyData.map(workout =>{
              return (<CardItem>
            <Text header>{workout.name}</Text>
              </CardItem>)
            })}

          </Card>
        </Content>
      </Container>
    );
  }
}

HomeScreen.navigationOptions = {
  title: "⚡️ Stride ⚡️"
};
