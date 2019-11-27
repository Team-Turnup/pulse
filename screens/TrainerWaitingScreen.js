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

export default class TrainerWaitingScreen extends React.Component {


  render() {
    const {navigation} = this.props
    // console.log(JSON.stringify(navigation.getParam('trainerId')))
    return (
      <Container>
        <Header>
          <Text>My Class</Text>
        </Header>
        <ListItem>
          <CheckBox Checked={true} />
          <Body>
            <Text>Use Default Haptic Settings</Text>
          </Body>
        </ListItem>
        <Button
            block
            danger
            style={{margin: 7}}
            onPress={() =>
              this.props.navigation.navigate('')
            }
          >
            <Text>Start Class</Text>
          </Button>
      </Container>
    )
  }
}

