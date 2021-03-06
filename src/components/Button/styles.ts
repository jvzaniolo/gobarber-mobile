import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled(RectButton)`
  width: 100%;
  height: 48px;
  background: #ff9000;
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`
