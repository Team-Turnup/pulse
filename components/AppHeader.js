import React from 'react'
import {StyleSheet, View, Label, Image} from 'react-native'
import activityTypes from '../assets/images/activityTypes'
import {
  Container,
  Button,
  Text,
  Title,
  Content,
  Card,
  CardItem
} from 'native-base'
import {connect} from 'react-redux'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {logout} from '../store/user'
import {getMyClassesThunk} from '../store/myClasses'
import {getClassThunk} from '../store/singleClass'

class AppHeader extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     upcomingClasses: [],
  //     index: 0,
  //     timer: '',
  //     clearIndex: null,
  //     clearCheckDate: null,
  //     clearTimer: null
  //   }
  // }

  // async componentWillReceiveProps(newProps) {
  //   const {myClasses} = newProps
  //   let {clearIndex, clearCheckDate, clearTimer, index} = this.state
  //   let upcomingClasses = myClasses.filter(aClass => {
  //     const time = new Date(aClass.when) - new Date()
  //     return time < 10 * 60 * 1000 && time>0
  //   })
  //   await this.setState({upcomingClasses})
  //   console.log(upcomingClasses)

  //   if(upcomingClasses.length) {
  //     this.startTimer()
  //   }

  //   if (upcomingClasses.length>1){
  //     this.startIndex()
  //   }

  //   clearInterval(clearCheckDate)
  //   this.startCheckDate()
  // }

  // startTimer() {
  //   let clearTimer = setInterval(() => {
  //     let {upcomingClasses, index} = this.state
  //     const timeToStart = (new Date(upcomingClasses[index].when)-new Date())/1000
  //     const minToStart = Math.floor(timeToStart/60)
  //     const secToStart = Math.floor(timeToStart%60)
  //     this.setState({timer:timeToStart<0?'in progress...':`${minToStart ? `${minToStart}m` : ''} ${secToStart ? `${secToStart}s` : ''}`})
  //   }, 1000)
  //   this.setState({clearTimer})
  // }

  // stopTimer() {
  //   let {clearTimer} = this.state
  //   clearInterval(clearTimer)
  //   this.setState({clearTimer: null, timer: ''})
  // }

  // startIndex() {
  //     let clearIndex = setInterval(() => {
  //       this.setState(prevState=>({index:(prevState.index+1)%prevState.upcomingClasses.length}))
  //     }, 10000)
  //     this.setState({clearIndex})
  // }

  // stopIndex() {
  //   let {clearIndex} = this.state
  //   clearInterval(clearIndex)
  //   this.setState({clearIndex: null, index: 0})
  // }

  // startCheckDate() {
  //   let clearCheckDate = setInterval(()=>{
  //     let {myClasses} = this.props
  //     const upcomingClasses = myClasses.filter(aClass => {
  //       const time = new Date(aClass.when) - new Date()
  //       return time < 10 * 60 * 1000 && time>0
  //     })
  //     if (this.state.upcomingClasses.length>=2 && upcomingClasses.length<2) {
  //       this.stopIndex()
  //     } else if (this.state.upcomingClasses.length<1 && upcomingClasses.length>=1) {
  //       this.startIndex()
  //     }
  //     if (this.state.upcomingClasses.length>=1 && upcomingClasses.length<1) {
  //       this.stopTimer()
  //     } else if (this.state.upcomingClasses.length<1 && upcomingClasses.length>=1) {
  //       this.startTimer()
  //     }
  //     this.setState({upcomingClasses})
  //   }, 60000)
  //   this.setState({clearCheckDate})
  // }

  // componentDidMount() {
  //   this.props.getMyClassesThunk()
  // }

  // componentWillUnmount() {
  //   const {clearIndex, clearCheckDate, clearTimer} = this.state
  //   clearInterval(clearIndex)
  //   clearInterval(clearCheckDate)
  //   clearInterval(clearTimer)
  // }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(84, 130, 53, 0.3)',
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Image
              medium
              source={require('../assets/images/Pic.png')}
              style={{width: 50, height: 60}}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 24,
                fontWeight: '600'
              }}
            >
              Stride
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text>
              {this.props.user.name && this.props.user.name.length
                ? this.props.user.name
                : this.props.user.email}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.logout()
                this.props.navigation.navigate('LoginScreen')
              }}
            >
              <Image
                style={{width: 25, height: 25, margin: 5}}
                source={require('../assets/images/Logout.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* {upcomingClasses.length ? <View
          style={{
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: 'rgb(84, 130, 53)',
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '80%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}
        >
          <Text style={{color: 'rgb(84, 130, 53)'}}>
            {upcomingClasses[index].name} {timer==='in progress...' ? timer : `starting in ${timer}`}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(84, 130, 53)',
              padding: 5,
              margin: 5,
              borderRadius: 5
            }}
            onPress={async () => {
              console.log('hey')
              await this.props.getClassThunk(upcomingClasses[index].id)
              this.props.navigation.navigate(
                upcomingClasses[index].userId === this.props.user.id
                  ? 'TrainerWaitingScreen'
                  : 'UserWaitingScreen'
              )
            }}
          >
            <Text style={{color: 'white'}}>Go to class!</Text>
          </TouchableOpacity>
        </View> : null} */}
      </View>
    )
  }
}

const mapStateToProps = ({user, myClasses}) => ({user, myClasses})
const mapDispatchToProps = {logout, getMyClassesThunk, getClassThunk}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
