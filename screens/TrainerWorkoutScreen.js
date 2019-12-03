import React, {useEffect} from 'react'
import {
  Container,
  Text,
  Content,
  Header,
  Card,
  CardItem,
  View,
  StyleSheet
} from 'native-base'
import {dummyClass} from './WaitingScreenComponents'
import dummyWorkout from '../dummyWorkout.json'
import WorkoutGraph from './WorkoutGraph'
import {useSelector} from 'react-redux'

// this component is expecting a socket to be passed as props from the trainer waiting screen
export default ({socket}) => {
  console.log(dummyWorkout)
  return (
    <Container>
      <Header />
      <Content>
        <Text>Hi</Text>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  visual: {
    width: '100%',
    height: 200
  },
  col: {
    width: '50%',
    height: 50,
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '100%',
    height: '100%'
  },
  info: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'row'
  }
})
