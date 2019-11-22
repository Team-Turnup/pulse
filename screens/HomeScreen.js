import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Card,
  CardItem
} from "native-base";
import {
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryAxis,
  VictoryBrushLine
} from "victory-native";

export default class HomeScreen extends Component {
  render() {
    let dummyData = [
      { name: "First Workout", duration: 60, date: "Sept.15.2019" },
      { name: "Second Workout", duration: 45, date: "Oct.4.2019" },
      { name: "Third Workout", duration: 70, date: "Nov.21.2019" },
      { name: "Fourth Workout", duration: 80, date: "Dec.13.2019" }
    ];
    return (
      <Container style={{ backgroundColor: "pink" }}>
        <Content style={{ backgroundColor: "midnightblue" }}>
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
              );
            })}
          </Card>
          <Button block danger onPress={() => alert("New Workout Added")}>
            <Text>Add New Workout</Text>
          </Button>
          <Card>
            <VictoryChart domainPadding={5}>
              <VictoryAxis dependentAxis tickFormat={x => `${x} min`} />
              <VictoryAxis independentAxis tickFormat={y => y.split(' ')[0]} />
              <VictoryLabel text="Recent Workouts" textAnchhor="middle"
              x={225}
              y={30}
              />
              <VictoryBar
                style={{ data: { fill: "gold", width:20 } }}
                alignment="start"
                data={dummyData}
                y={data => data.duration}
                x={data => data.name}
              />
            </VictoryChart>
          </Card>
        </Content>
      </Container>
    );
  }
}

HomeScreen.navigationOptions = {
  title: "⚡️ Stride ⚡️"
};
