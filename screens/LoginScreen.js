import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store/users'
import {Image} from 'react-native'
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
class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //formName: 'login',
      email: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(evt) {
    //evt.preventDefault()
    const formName = 'login'
    const email = this.state.email.value
    const password = this.state.password.value
    this.props.doHandleLogin({email, password}, formName)
  }

  // handleLogin() {
  //   const formName = 'login'
  //   this.props.doHandleLogin(this.state)
  //   this.setState({
  //     email: '',
  //     password: ''
  //   })
  //   //this.props.navigation.navigate('HomeScreen');
  // }

  // handleSignup(evt) {
  //   //evt.preventDefault()
  //   const formName = evt.target.name
  //   const email = evt.target.email.value
  //   const password = evt.target.password.value
  //   // const firstName = evt.target.firstName.value
  //   // const lastName = evt.target.lastName.value
  //   // const username = evt.target.username.value
  //   this.props.doHandleSignup({email, password}, formName)
  //}

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

            <Button block onPress={() => this.handleLogin()}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

LoginScreen.navigationOptions = {
  header: null
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
    user: state.user,
    name: 'login',
    displayName: 'Login'
    //error: state.user.error
  }
}

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

const mapDispatch = dispatch => ({
  doHandleLogin: ({email, password}, formName) =>
    dispatch(auth({email, password}, formName))
  //doHandleLogin: user => dispatch(auth(user))
})

export default connect(mapLogin, mapDispatch)(LoginScreen)
//export const Signup = connect(mapSignup, mapDispatch)(LoginScreen)

LoginScreen.propTypes = {
  name: PropTypes.string,
  //displayName: PropTypes.string.isRequired,
  doHandleLogin: PropTypes.func,
  handleSignup: PropTypes.func,
  error: PropTypes.object
}
