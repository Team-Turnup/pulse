import React, {Fragment} from 'react'

// Components
import {StyleSheet} from 'react-native'
import {List, ListItem, Text, H2, H3, Button} from 'native-base'

// Utility libraries
import {DateTime} from 'luxon'
import userData from '../assets/images/userData'

export const dummyClass = {
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

export const StartTime = ({when}) => {
  const _when = DateTime.fromMillis(when)
  const _timeLeft = _when
    .diffNow(['days', 'hours', 'minutes', 'seconds'])
    .toObject()
  const _formatDateTime = () => {
    // Time Formats:
    // 1 day away -> start date in MM/DD/YYY
    // more than 1 hr away -> start time in hh:mm AM/PM
    // more than 1 minute away -> start time `in X minutes`
    // less than 60s away -> start time `in X seconds`
    if (_timeLeft.days >= 1) return _when.toLocaleString(DateTime.DATE_SHORT)
    else if (_timeLeft.hours > 0)
      return _when.toLocaleString(DateTime.TIME_SIMPLE)
    else if (_timeLeft.minutes > 0) return _when.toRelative({unit: 'minutes'})
    else return _when.toRelative({unit: 'seconds'})
  }
  return (
    <Fragment>
      <H2>Start Time: </H2>
      <H3>{_formatDateTime()}</H3>
    </Fragment>
  )
}

export const StartButton = () => (
  <Button>
    <Text>Start Class</Text>
  </Button>
)

export const UserList = ({attendees}) => (
  <Fragment>
    <H3 style={{textAlign: 'center', paddingTop: 20}}>Attendees</H3>
    <List>
      <ListItem itemHeader style={styles.listItem}>
        <Text style={[styles.email, styles.listHeader]}>Email</Text>
        <Text style={[styles.age, styles.listHeader]}>Age</Text>
        <Text style={[styles.sex, styles.listHeader]}>Sex</Text>
      </ListItem>
      {attendees.map(({id: userId, email, age, sex}) => (
        <ListItem
          key={userId}
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
  </Fragment>
)

export const styles = StyleSheet.create({
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
  activityName: {flex: 2, textAlign: 'left'},
  activityIcon: {flex: 1, textAlign: 'center'},
  cadence: {flex: 2, textAlign: 'center'},
  duration: {flex: 2, textAlign: 'right'},
  selected: {
    backgroundColor: 'rgba(0,255,0,0.25)'
  },
  startView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  }
})
