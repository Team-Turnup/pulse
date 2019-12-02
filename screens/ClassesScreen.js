import React from 'react'
import {connect} from 'react-redux'
import {View, StyleSheet, ScrollView} from 'react-native'
import {
  Container,
  Button,
  Text,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Form,
  Input,
  Item,
  Label
} from 'native-base'
import {fetchClasses} from '../store/classes'
import {enrollClass} from '../store/singleClass'

class ClassesScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getClasses()
  }

  handleChange(search) {
    this.setState({search})
  }

  render() {
    const studentId = this.props.navigation.getParam('loggedInUserId', 'NA')

    const {classes} = this.props
    let allClasses = classes.filter(aClass =>
      aClass.name.toLowerCase().includes(this.state.search.toLowerCase())
    )
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Form style={{backgroundColor: 'pink'}}>
            <Item floatingLabel>
              <Label>Search Classes</Label>
              <Input
                autoCapitalize="none"
                name="search"
                value={this.state.search}
                onChangeText={this.handleChange}
              />
            </Item>
          </Form>
          <Card>
            <CardItem>
              <Title>Classes</Title>
            </CardItem>
            <Card>
              {allClasses.map((aClass, i) => {
                return (
                  <CardItem
                    onPress={() => {
                      this.props.enrollClass(aClass.id, studentId),
                      this.props.navigation.navigate('UserWaitingScreen', {
                        trainerId: aClass.userId,
                        studentId:studentId,
                        classId:aClass.id
                      }),
                      console.log('THECLASSSS',aClass),
                      console.log('THECLASSSSIDDD',aClass.id)

                    }}
                    button
                    key={i}
                  >
                    <Text header>
                      {i + 1}. {aClass.name}
                    </Text>
                  </CardItem>
                )
              })}
            </Card>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  classes: state.classes
})

const mapDispatchToProps = dispatch => ({
  getClasses: () => dispatch(fetchClasses()),
  enrollClass: (classId, studentId) => dispatch(enrollClass(classId, studentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassesScreen)
