import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  Header,
  Grid,
  Title,
  Content,
  Card,
  CardItem,
  Row,
  Col
} from "native-base";
import {
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryAxis,
  VictoryBrushLine
} from "victory-native";

export default class InProgressScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container>
        <Grid>
          <Row size={4.25}>
            <Col style={{ backgroundColor: "midnightblue" }}></Col>
            <Col style={{ backgroundColor: "teal" }}></Col>
          </Row>

          <Row size={4.25} style={{ backgroundColor: "salmon" }}></Row>

          <Row
            size={1.5}
            style={{
              backgroundColor: "mistyrose",
              flex: 1,
              justifyContent: "space-evenly",
              // alignSelf: "center",
              // alignItems: "center"
            }}
          >
            <Button large>
              <Text>Cadence</Text>
            </Button>
            <Button large>
              <Text>Heart Rate</Text>
            </Button>
          </Row>
        </Grid>
      </Container>
    );
  }
}

InProgressScreen.navigationOptions = {
  header: null
};
