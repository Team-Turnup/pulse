import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import {
  Container,
  Header,
  Title,
  Form,
  Content,
  Picker,
  Item,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  ListItem
} from 'native-base'

class CreateClassScreen extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <Container>
        <Button onPress={() => this.props.navigation.navigate('')}></Button>
        <Button onPress={() => this.props.navigation.navigate('')}>></Button>
      </Container>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassScreen)
