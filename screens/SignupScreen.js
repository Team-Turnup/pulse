import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store/users'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native'
import {
  Container,
  Header,
  Thumbnail,
  Content,
  Form,
  Item,
  Input,
  Label,
  Card,
  CardItem,
  Button,
  Text
} from 'native-base'
import {tsImportEqualsDeclaration} from '@babel/types'
class SignupScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleSignup() {
    const formName = 'signup'
    this.props.doHandleSignup(this.state, formName)
    this.setState({
      email: '',
      password: ''
    })
    this.props.navigation.navigate('HomeStack')
  }

  render() {
    const {name, displayName, handleLogin, handleSignup, error} = this.props
    return (
      <Container>
        <Content>
          <Card transparent>
            <CardItem
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center'
              }}
            >
              <Thumbnail
                medium
                source={require('../assets/images/strideLogo.png')}
              />
            </CardItem>
          </Card>
          <Form style={{paddingBottom: 25}} name={'signup'}>
            <Header>
              <Text style={styles.header}>
                Input your Information to Create an Account!
              </Text>
            </Header>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                name="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
              />
            </Item>

            <Button
              style={styles.button}
              block
              onPress={() => this.handleSignup()}
            >
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

SignupScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    color: 'rgba(255,255,255, 0.9)',
    backgroundColor: 'gray'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: '30%',
    margin: 5,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  message: {
    fontSize: 10,
    textAlign: 'center'
  },
  item: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  checkBox: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  name: {
    textAlign: 'right'
  },
  sectionHeader: {
    width: '100%',
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center'
  }
})

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for signup, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    users: state.users,
    name: 'signup',
    displayName: 'Sign Up'
    //error: state.user.error
  }
}

const mapDispatch = dispatch => ({
  doHandleSignup: (user, method) => dispatch(auth(user, method))
})

export default connect(mapSignup, mapDispatch)(SignupScreen)

SignupScreen.propTypes = {
  name: PropTypes.string,
  //displayName: PropTypes.string.isRequired,
  doHandleSignup: PropTypes.func
  // handleSignup: PropTypes.func,
  // error: PropTypes.object
}
