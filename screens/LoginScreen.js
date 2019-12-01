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
import {saveUserToken} from '../store/auth'

import {tsImportEqualsDeclaration} from '@babel/types'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    //this.handleLogin = this.handleLogin.bind(this)
  }

  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc')
  //   this.props.navigation.navigate('App')
  // }
  _signInAsync = () => {
    this.props
      .saveUserToken()
      // .then(() => {
      //   //this.props.navigation.navigate('Auth')
      //   this.props.navigation.navigate('LoginScreen')
      // })
      .then(() => {
        this.props.navigation.navigate('HomeScreen')
      })

      .catch(error => {
        this.setState({error})
      })
  }

  // handleLogin() {
  //   const formName = 'login'
  //   this.props.doHandleLogin(this.state, formName)
  //   this.setState({
  //     email: '',
  //     password: ''
  //   })
  //   this.props.navigation.navigate('HomeStack')
  // }

  render() {
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
          <Form style={{paddingBottom: 25}} name={'login'}>
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
              block
              style={styles.button}
              //onPress={() => this.handleLogin()}
              onPress={this._signInAsync}
            >
              <Text>Sign In</Text>
            </Button>
          </Form>
          <Button
            block
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SignupScreen')}
          >
            <Text>Create an Account</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

LoginScreen.navigationOptions = {
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
    //width: '30%',
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapLogin = state => {
  return {
    users: state.users,
    name: 'login',
    displayName: 'Login',
    //error: state.user.error
    token: state.token
  }
}

const mapDispatch = dispatch => ({
  //doHandleLogin: (user, method) => dispatch(auth(user, method))
  saveUserToken: () => dispatch(saveUserToken())
})

export default connect(mapLogin, mapDispatch)(LoginScreen)

LoginScreen.propTypes = {
  name: PropTypes.string,
  //displayName: PropTypes.string.isRequired,
  doHandleLogin: PropTypes.func
  // handleSignup: PropTypes.func,
  // error: PropTypes.object
}
