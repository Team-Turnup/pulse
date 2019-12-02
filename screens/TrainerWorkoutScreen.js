import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import useInterval from 'use-interval'
import {StyleSheet} from 'react-native'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  H2,
  H3,
  View,
  Button
} from 'native-base'
import {DateTime} from 'luxon'
import activityTypes from '../assets/images/activityTypes'
import userData from '../assets/images/userData'

const dummyClass = {
  id: 11,
  name: 'Class # 21459',
  canEnroll: true,
  when: Date.now() + 1000 * 35,
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

export const StartTime = ({when}) => {
  const whenDateTime = DateTime.fromMillis(when)
  return (
    <View style={styles.startView}>
      <H2>Start Time: </H2>
      <H3>
        {whenDateTime.diffNow('seconds').toObject().seconds > 30
          ? whenDateTime.toLocaleString(DateTime.DATETIME_SHORT) // short dateTime format if more than 30s away (mm/dd/yyyy, HH:MM)
          : whenDateTime.toRelative({
              unit: 'seconds'
            }) /* relative time format if less than 30s away */}
      </H3>
    </View>
  )
}

export const StartButton = () => (
  <View style={styles.startView}>
    <Button>
      <Text>Start Class</Text>
    </Button>
  </View>
)

export const UserList = ({attendees}) => (
  <List>
    <ListItem itemHeader style={styles.listItem}>
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
  const [curTime, setCurTime] = useState(Date.now())

  useInterval(() => setCurTime(Date.now()), 1000)

  return (
    <Container>
      <Header />
      {_class.when < curTime ? (
        <StartButton />
      ) : (
        <StartTime when={_class.when} />
      )}
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
  },
  startView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10
  }
})