import React from 'react'
import {connect} from 'react-redux'
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

import {leaveClass} from '../store/singleClass'

class UserWaitingScreen extends React.Component {

  render() {
    const {navigation,leaveClass} = this.props
    let classId = navigation.getParam('classId', 'NA')
    let studentId = navigation.getParam('studentId', 'NA')

    console.log('..................................................')
    console.log("WAITING classId", classId)
    console.log("WAITING studentId", studentId)



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
            onPress={() =>{
              leaveClass(classId,studentId)
              this.props.navigation.navigate('HomeScreen')
            }
            }
          >
            <Text>Leave Class</Text>
          </Button>
      </Container>
    )
  }
}



const mapDispatchToProps = dispatch => ({
  leaveClass: (classId, studentId) => dispatch(leaveClass(classId,studentId))
})

export default connect(null,mapDispatchToProps)(UserWaitingScreen)
