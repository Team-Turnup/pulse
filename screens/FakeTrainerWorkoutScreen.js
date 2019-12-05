import React, {useEffect, useState, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  Container,
  Text,
  Content,
  Header,
  Card,
  CardItem,
  View,
  List,
  ListItem
} from 'native-base'
import {StyleSheet} from 'react-native'
import WorkoutGraph from './WorkoutGraph'
import {SocketContext} from '../socket'
import userData from '../assets/images/userData'

const FakeTrainerWorkoutScreen = ({socket}) => {
  const {attendees, when, name, ..._class} = useSelector(
    ({singleClass}) => singleClass
  )
  const routine = useSelector(({intervals, ...routine}) => routine)
  const userId = useSelector(({user}) => user.id)

  const [userOpacities, setUserOpacities] = useState(
    attendees.reduce((a, b) => ({...a, [b]: 0.3}), {})
  )
  const [userColors, setUserColors] = useState(
    attendees.reduce((a, b) => ({...a, [b]: 'rgba(0,0,0,0)'}), {})
  )

  useEffect(() => {
    socket.on('workoutTimestamp', (userId, workoutTimestamp, color) => {
      console.log('getting data!', userColors, userOpacities)
      if (userColors[userId] === 'rgba(0,0,0,0)')
        setUserColors({...userColors, [userId]: color})
      setUserOpacities({...userOpacities, [userId]: 1})
      const wait = setInterval(
        () => () => setUserOpacities({...userOpacities, [userId]: 0.3}),
        50
      )
    })
  }, [])

  return (
    <Container>
      <Header>
        <Text style={{fontWeight: 'bold'}}>{name}</Text>
      </Header>
      <Content>
        <List>
          <ListItem itemHeader style={styles.listItem}>
            <Text style={[styles.name, styles.listHeader]}>Name</Text>
            <Text style={[styles.age, styles.listHeader]}>Age</Text>
            <Text style={[styles.gender, styles.listHeader]}>Gender</Text>
          </ListItem>
          {attendees.map(({id: userId, name, age, gender}) => (
            <ListItem
              key={userId}
              style={[
                styles.listItem,
                {
                  backgroundColor: userColors[userId],
                  opacity: userOpacities[userId]
                }
              ]}
            >
              <Text style={styles.name}>{name} </Text>
              <Text style={styles.age}>{age}</Text>
              <Text style={styles.gender}>{userData[gender].icon}</Text>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listHeader: {
    fontWeight: 'bold'
  },
  name: {flex: 5, textAlign: 'left'},
  age: {flex: 2, textAlign: 'center'},
  gender: {flex: 1, textAlign: 'right'},
  startView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'rgb(84, 130, 53)',
    lineHeight: 30
  }
})

export default props => (
  <SocketContext.Consumer>
    {socket => <FakeTrainerWorkoutScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
)
