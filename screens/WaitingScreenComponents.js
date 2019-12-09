import React, {Fragment} from 'react'

// Components
import {StyleSheet} from 'react-native'
import {List, ListItem, Text, H2, H3, Button} from 'native-base'

// Utility libraries
import {DateTime} from 'luxon'
import userData from '../assets/images/userData'

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

export const StartButton = ({_onPress}) => (
  <Button style={styles.button} onPress={_onPress}>
    <Text>Start Class</Text>
  </Button>
)

export const UserList = ({attendees, userColors}) => (
  <Fragment>
    <Text style={{textAlign: 'center', paddingTop: 20}}>
      Attendees ({attendees.filter(a => a.ready).length} Waiting /{' '}
      {attendees.length} Total)
    </Text>
    <List>
      <ListItem itemHeader style={styles.listItem}>
        <Text style={[styles.name, styles.listHeader]}>Name</Text>
        <Text style={[styles.age, styles.listHeader]}>Age</Text>
        <Text style={[styles.gender, styles.listHeader]}>Gender</Text>
      </ListItem>
      {attendees.map(({id: userId, name, age, gender, ready = false}) => (
        <ListItem
          key={userId}
          style={[
            styles.listItem,
            userColors && ready
              ? {backgroundColor: userColors[userId], opacity: 0.3}
              : {}
          ]}
        >
          <Text style={[styles.name, {color: 'black'}]}>{name} </Text>
          <Text style={([styles.age], {color: 'black'})}>{age}</Text>
          <Text style={[styles.gender, {color: 'black'}]}>
            {userData[gender].icon}
          </Text>
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
  name: {flex: 5, textAlign: 'left'},
  age: {flex: 1, textAlign: 'center'},
  gender: {flex: 2, textAlign: 'right'},
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
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'rgb(84, 130, 53)',
    lineHeight: 30
  },
  button: {
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 15,
    marginRight: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  }
})
