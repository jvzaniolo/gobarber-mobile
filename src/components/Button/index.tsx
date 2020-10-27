import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Text } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <Container {...rest}>
      <Text>{children}</Text>
    </Container>
  );
};

export default Button;
