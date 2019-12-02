import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StyleSheet} from 'react-native'
import {Container, Header, Content, List, ListItem, Text} from 'native-base'
import WorkoutGraph from './WorkoutGraph'
import activityTypes from '../assets/images/activityTypes'
import userData from '../assets/images/userData'

const dummyClass = {
  id: 11,
  name: 'Class # 21459',
  canEnroll: true,
  when: Date.now() + 1000 * 60 * 3,
  routine: {
    id: 21,
    name: 'Eloise',
    activityType: 'pushups',
    intervals: [
      {
        id: 62,
        activityType: 'dancing',
        cadence: 930,
        duration: 10
      },
      {
        id: 61,
        activityType: 'stairs',
        cadence: 829,
        duration: 10
      },
      {
        id: 63,
        activityType: 'dancing',
        cadence: 32,
        duration: 20
      }
    ]
  },
  attendees: [
    {
      id: 4,
      email: 'Casandra25@yahoo.com',
      age: 44,
      sex: 'female'
    },
    {
      id: 15,
      email: 'Hubert.Cronin86@hotmail.com',
      age: 59,
      sex: 'non-binary'
    },
    {
      id: 23,
      email: 'Dayne_Raynor@hotmail.com',
      age: 32,
      sex: 'female'
    },
    {
      id: 38,
      email: 'Gertrude85@yahoo.com',
      age: 49,
      sex: 'male'
    },
    {
      id: 45,
      email: 'Jerel_Kihn52@gmail.com',
      age: 53,
      sex: 'male'
    },
    {
      id: 62,
      email: 'Reina.Herman@yahoo.com',
      age: 56,
      sex: 'non-binary'
    },
    {
      id: 58,
      email: 'Rigoberto.Schroeder87@gmail.com',
      age: 50,
      sex: 'female'
    }
  ]
}

export const UserList = ({attendees}) => (
  <List>
    <ListItem style={styles.listItem}>
      <Text style={[styles.email, styles.listHeader]}>Email</Text>
      <Text style={[styles.age, styles.listHeader]}>Age</Text>
      <Text style={[styles.sex, styles.listHeader]}>Sex</Text>
    </ListItem>
    {attendees.map(({email, age, sex}, i) => (
      <ListItem
        key={email}
        style={[
          styles.listItem,
          Math.round(Math.random()) ? styles.selected : null
        ]}
      >
        <Text style={styles.email}>{email} </Text>
        <Text style={styles.age}>{age}</Text>
        <Text style={styles.sex}>{userData[sex].icon}</Text>
      </ListItem>
    ))}
  </List>
)

export default () => {
  //   const dispatch = useDispatch()
  //   const _class = useSelector(({singleClass}) => singleClass)
  const {routine, attendees, ..._class} = dummyClass

  // any way of making these style classes more clean?
  return (
    <Container>
      <Header />
      <Content>
        <UserList attendees={attendees} />
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
  email: {flex: 5, textAlign: 'left'},
  age: {flex: 2, textAlign: 'center'},
  sex: {flex: 1, textAlign: 'right'},
  selected: {
    backgroundColor: 'rgba(0,255,0,0.25)'
  }
})
