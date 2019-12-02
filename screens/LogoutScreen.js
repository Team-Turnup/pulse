import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store/user'
import {StyleSheet} from 'react-native'
import {
  Container,
  Thumbnail,
  Content,
  Card,
  CardItem,
  Button,
  Text
} from 'native-base'
class LogoutScreen extends React.Component {

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
          <Button
            block
            style={styles.button}
            onPress={this.props.handleClick}
          >
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

LogoutScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
})


const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
  }
})

export default connect(null, mapDispatch)(LogoutScreen)

// LogoutScreen.propTypes = {
//   name: PropTypes.string,
//   //displayName: PropTypes.string.isRequired,
//   doHandleLogin: PropTypes.func,
//   // handleSignup: PropTypes.func,
//   // error: PropTypes.object,
//   isLoggedIn: PropTypes.bool
// }
