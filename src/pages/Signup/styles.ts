import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  align-items: center;
  justify-content: center;
  padding: 0 32px ${Platform.OS === 'android' ? 160 : 40}px;
`

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const BackToLogin = styled.TouchableOpacity`
  bottom: 0;
  width: 100%;
  position: absolute;
  border-color: #232129;
  border-top-width: 1px;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  align-items: center;
  flex-direction: row;
  justify-content: center;
`

export const BackToLoginText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 8px;
  font-family: 'RobotoSlab-Regular';
`
