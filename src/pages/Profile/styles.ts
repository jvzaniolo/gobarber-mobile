import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  justify-content: center;
  padding: 0 32px ${Platform.OS === 'android' ? 160 : 40}px;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 64px;
`

export const Title = styled.Text`
  color: #f4ede8;
  margin: 24px 0;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
`

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 96px;
  align-self: center;
`
