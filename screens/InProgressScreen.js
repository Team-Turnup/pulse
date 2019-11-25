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
          <Row size={4}>
            <Col>
              <Content
                contentContainerStyle={{
                  justifyContent: "space-evenly",
                  // alignItems: "center"
                }}
              >
                <Card transparent style={{marginTop:15}}>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text>0:00.00</Text>
                      <Text>Total Time</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text>#</Text>
                      <Text>Goal Cadence</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem>
                    <Content
                      contentContainerStyle={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text>#</Text>
                      <Text>Total Steps</Text>
                    </Content>
                  </CardItem>
                </Card>
              </Content>
            </Col>
            <Col style={{ backgroundColor: "teal" }}>
            <Content
                contentContainerStyle={{
                  justifyContent: "space-evenly",
                  // alignItems: "center"
                }}
              >
                <Card transparent style={{marginTop:15}}>
                  <CardItem style={{backgroundColor:'teal'}}>
                    <Content
                      contentContainerStyle={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text>0:00.00</Text>
                      <Text>Interval Time</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem style={{backgroundColor:'teal'}}>
                    <Content
                      contentContainerStyle={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text>#</Text>
                      <Text>Current Cadence</Text>
                    </Content>
                  </CardItem>
                </Card>
                <Card transparent>
                  <CardItem style={{backgroundColor:'teal'}}>
                    <Content
                      contentContainerStyle={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>#</Text>
                      <Text>Distance</Text>
                    </Content>
                  </CardItem>
                </Card>
              </Content>
            </Col>
          </Row>

          <Row
            size={5.5}
            style={{ backgroundColor: "salmon", justifyContent: "center" }}
          >
            <Text>DROP LVE GRAPH HERE</Text>
          </Row>

          <Row
            size={1.5}
            style={{
              backgroundColor: "mistyrose",
              flex: 1,
              justifyContent: "space-evenly"
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
  // title:'👟🏃🏽🏋🏽'
  header:null
};
