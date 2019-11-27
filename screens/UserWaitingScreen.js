import React from 'react'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Body,
  Card,
  CardItem,
  ListItem,
  CheckBox
} from 'native-base'

export default class UserWaitingScreen extends React.Component {

  componentDidMount(){

  }


  render() {
    const {navigation} = this.props
    // console.log(JSON.stringify(navigation.getParam('trainerId')))
    return (
      <Container>
        <Header>
          <Text>Trainer's Class</Text>
        </Header>
        <ListItem>
          <CheckBox Checked={true} />
          <Body>
            <Text>Use Class Haptic Settings</Text>
          </Body>
        </ListItem>
        <Button
            block
            danger
            style={{margin: 7}}
            onPress={() =>
              this.props.navigation.navigate('SelectRoutineScreen')
            }
          >
            <Text>Leave Class</Text>
          </Button>
      </Container>
    )
  }
}

