import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {StyleSheet, View, Linking, Image} from 'react-native'
import {auth, logout} from '../store/user'
import {
  Container,
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
import * as Google from 'expo-google-app-auth'
//import ANDROID_GOOGLE_CLIENT_ID from '../secrets'
import {me} from '../store/user'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: '',
      for: 0,
      forArray: [
        'coaches',
        'runners',
        'swimmers',
        'trainers',
        'musicians',
        'conductors',
        'rowers',
        'cyclists',
        'calisthenics',
        'meditation',
        'Lamaze',
        'dancers',
        'choreographers'
      ].sort(() => Math.random() - 0.5)
    }
    this.clear = null
    this.handleAuth = this.handleAuth.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
  }

  componentWillUnmount() {
    clearInterval(this.clear)
  }

  componentDidMount() {
    this.clear = setInterval(
      () =>
        this.setState(prevState => ({
          for: (prevState.for + 1) % this.state.forArray.length
        })),
      2000
    )
    // const user = await this.props.me()
    // const isUser =
    //   typeof user === 'object' &&
    //   Object.keys(user).length &&
    //   !user.error
    // if (isUser) {
    //   this.props.navigation.navigate('HomeStack')
    // }
  }

  async handleAuth(formName) {
    const result = await this.props.doHandleAuth(this.state, formName)
    this.setState({
      email: '',
      password: '',
      message: ''
    })
    if (result.user && result.user.error) {
      this.setState({
        message:
          formName === 'login'
            ? 'Wrong username and/or password'
            : 'Unable to sign up with given username and/or password'
      })
      setTimeout(() => this.setState({message: ''}), 2000)
    } else {
      this.props.navigation.navigate('HomeWorkoutsStack')
    }
  }

  async loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '237987528571-l28e6dd63f4cnhjv1itscvj8a5r9j8uo.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })
      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const isUser =
      typeof this.props.user === 'object' &&
      Object.keys(this.props.user).length &&
      !this.props.user.error
    return (
      <Container>
        <Content>
          <View
            style={{
              backgroundColor: 'rgb(84, 130, 53)',
              width: '100%',
              paddingTop: 15,
              paddingBottom: 15
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontWeight: '600',
                color: 'white',
                textAlign: 'center'
              }}
            >
              Pulse
            </Text>
          </View>
          <Card transparent style={{margin: 0, padding: 0}}>
            <CardItem
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 0
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgba(84, 130, 53, 0.3)',
                  paddingTop: 20,
                  paddingBottom: 20,
                  width: '100%',
                  borderRadius: 10,
                  overflow: 'hidden'
                }}
              >
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                  A solo- or class-based tempo trainer
                </Text>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                  with visual and vibrational feedback
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginTop: 20
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 175,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{fontSize: 18}}>For</Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: 'rgb(84, 130, 53)',
                        marginTop: 10
                      }}
                    >
                      {this.state.forArray[this.state.for]}
                    </Text>
                  </View>
                  <Image
                    medium
                    source={require('../assets/images/Pic.png')}
                    style={{width: 110, height: 140}}
                  />
                </View>
              </View>
            </CardItem>
          </Card>
          {!isUser ? (
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
            </Form>
          ) : null}
          <Text style={{textAlign: 'center', fontSize: 12}}>
            {this.state.message}
          </Text>
          {/* <View style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}> */}
          {!isUser ? (
            <Button
              style={{...styles.button, marginTop: 15}}
              onPress={() => this.handleAuth('login')}
            >
              <Text>Sign In</Text>
            </Button>
          ) : null}
          {!isUser ? (
            <Button
              style={styles.button}
              onPress={() => this.handleAuth('signup')}
            >
              <Text>Create an Account</Text>
            </Button>
          ) : null}

          {/* {!isUser ? (<Button
          style={styles.button}
            onPress={() => this.loginWithGoogle()}
            title="login with google"
          >
            <Text>Login with Google </Text>
          </Button>) : null} */}
          {/* </View> */}
        </Content>
      </Container>
      //    )
      //   }
      // </View>
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
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(84, 130, 53)'
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

LoginScreen.navigationOptions = {
  header: 'screen'
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    //error: state.user.error
    user: state.user,
    isLoggedIn: !!state.user
  }
}

const mapDispatch = dispatch => ({
  doHandleAuth: (user, method) => dispatch(auth(user, method)),
  me: () => dispatch(me()),
  handleClick() {
    dispatch(logout())
  }
})

export default connect(mapLogin, mapDispatch)(LoginScreen)

LoginScreen.propTypes = {
  name: PropTypes.string,
  //displayName: PropTypes.string.isRequired,
  doHandleLogin: PropTypes.func,
  // handleSignup: PropTypes.func,
  // error: PropTypes.object,
  isLoggedIn: PropTypes.bool
}
