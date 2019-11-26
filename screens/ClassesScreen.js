import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Form,
  Input,
  Item,
  Label
} from 'native-base'

export default class ClassesScreen extends React.Component {
  render() {
    let dummyData = [
      {name: 'First Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Class', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Class', duration: 80, date: 'Dec.13.2019'},
      {name: 'First Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Class', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Class', duration: 80, date: 'Dec.13.2019'},
      {name: 'First Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Class', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Class', duration: 80, date: 'Dec.13.2019'},
      {name: 'First Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Class', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Class', duration: 80, date: 'Dec.13.2019'}
    ]
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Form style={{backgroundColor: 'pink'}}>
            <Item floatingLabel >
              <Label>Search Classes</Label>
              <Input />
            </Item>
          </Form>
          <Card>
            <CardItem header>
              <Title>Classes</Title>
            </CardItem>
            <List>
              {dummyData.map((workout, i) => {
                return (
                  <ListItem key={i}>
                    <Text header>
                      {i + 1}. {workout.name}
                    </Text>
                  </ListItem>
                )
              })}
            </List>
          </Card>
        </Content>
      </Container>
    )
  }
}
