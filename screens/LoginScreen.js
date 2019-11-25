import React from "react";
import { Image } from "react-native";
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
} from "native-base";
import { tsImportEqualsDeclaration } from "@babel/types";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <Card transparent>
            <CardItem
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center"
              }}
            >
              <Thumbnail
                medium
                source={require("../assets/images/strideLogo.png")}
              />
            </CardItem>
          </Card>
          <Form style={{ paddingBottom: 25 }}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                name="username"
                onChangeText={username => this.setState({ username })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
          </Form>
          <Button
            block
            onPress={() =>
              alert(
                `${this.state.username} has signed in\nwith the password: ${this.state.password}`
              )
            }
          >
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null
};
