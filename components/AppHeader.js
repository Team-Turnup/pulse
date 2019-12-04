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

class AppHeader extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgba(84, 130, 53, 0.3)',
          padding: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
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
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
        >
          <Text>
            {this.props.user.name && this.props.user.name.length
              ? this.props.user.name
              : this.props.user.email}
          </Text>
          <TouchableOpacity onPress={()=>{this.props.logout(); this.props.navigation.navigate('LoginScreen')}}>
          <Image
            style={{width: 25, height: 25, margin: 5}}
            source={require('../assets/images/Logout.png')}
          />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({user}) => ({user})
const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
