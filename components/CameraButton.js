import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';


export default class CameraButton extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Button>
            <Text>Click Me For Camera!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}