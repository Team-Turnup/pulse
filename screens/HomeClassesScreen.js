import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import {
  Container,
  Button,
  Text,
  Content,
  Card,
  Input,
  CardItem
} from 'native-base'
import {getMyClassesThunk} from '../store/myClasses'
import {getMyWorkoutsThunk} from '../store/workouts'
import {getClassThunk, setClass} from '../store/singleClass'
import AppHeader from '../components/AppHeader'
import UpcomingClasses from '../components/UpcomingClasses'
import PreviousClasses from '../components/PreviousClasses'

class HomeClassesScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Content>
        <AppHeader navigation={this.props.navigation} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-evenly'
          }}
        >
          <View></View>
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('ClassesScreen')}
          >
            <Text>Enroll in Class</Text>
          </Button>

          <Button
            style={styles.button}
            onPress={() => {
              this.props.setClass({})
              this.props.navigation.navigate('BuildClassScreen')
            }}
          >
            <Text>Create Class</Text>
          </Button>
          <Content style={{margin: 15}}>
            <UpcomingClasses />
            <PreviousClasses />
          </Content>
        </View>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
  }
})

const mapStateToProps = ({user, workouts, myClasses, routine}) => ({
  user,
  workouts,
  myClasses,
  routine
})

const mapDispatchToProps = {
  getMyClassesThunk,
  getMyWorkoutsThunk,
  getClassThunk,
  setClass
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeClassesScreen)
