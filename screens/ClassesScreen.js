import React from 'react'
import { connect } from 'react-redux';
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
import { fetchClasses } from '../store/classes'


class ClassesScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      search:''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.getClasses()
    console.log('PROPS',this.props)

  }

  handleChange(search){
    this.setState({search})
  }

  render() {
    let dummyData = [
      {name: 'First Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Jump Rope Class', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Class', duration: 80, date: 'Dec.13.2019'},
      {name: 'First Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Adanced Class', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Class', duration: 80, date: 'Dec.13.2019'},
      {name: 'Intermediate Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Second Class', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'P90X', duration: 80, date: 'Dec.13.2019'},
      {name: 'First Class', duration: 60, date: 'Sept.15.2019'},
      {name: 'Summer Shredding', duration: 45, date: 'Oct.4.2019'},
      {name: 'Third Class', duration: 70, date: 'Nov.21.2019'},
      {name: 'Fourth Class', duration: 80, date: 'Dec.13.2019'}
    ].filter(aClass => aClass.name.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
    return (
      <Container>
        <Content style={{backgroundColor: 'midnightblue'}}>
          <Form style={{backgroundColor: 'pink'}}>
            <Item floatingLabel >
              <Label>Search Classes</Label>
              <Input
              autoCapitalize="none"
              name='search'
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
              {dummyData.map((workout, i) => {
                return (
                  <CardItem button key={i}>
                    <Text header>
                      {i + 1}. {workout.name}
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

mapStateToProps = state =>({
  classes: state.classes
})
mapDispatchToProps = dispatch =>({
  getClasses: () => dispatch(fetchClasses())
})

export default connect(mapStateToProps,mapDispatchToProps)(ClassesScreen)
