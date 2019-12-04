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

export default class MyPreviousClasses extends React.Component {
  constructor() {
    super()
    this.state = {showAll: false}
  }

  render() {
    return (
      <Content>
        <Card>
          {/* <CardItem header>
            <Text>My Previous Solo myClasses</Text>
          </CardItem> */}
          {this.state.showAll
            ? this.props.myClasses.map(myClass => {
                return (
                  <Content key={myClass.id} style={{width: '100%'}}>
                    <Text>{myClass.name}</Text>
                  </Content>
                )
              })
            : this.props.myClasses.slice(0, 5).map(myClass => {
                return (
                  <Content key={myClass.id} style={{width: '100%'}}>
                    <Text>{myClass.name}</Text>
                  </Content>
                )
              })}
          <Content>
            <Text
              onPress={() => {
                this.setState(prevState => ({showAll: !prevState.showAll}))
              }}
            >
              {this.state.showAll ? 'Show 5 most recent classes' : 'Show all'}
            </Text>
          </Content>
        </Card>
      </Content>
    )
  }
}
