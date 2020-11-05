import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'
import { ProvidersProps } from './index'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  background: #28262e;
  padding-top: ${getStatusBarHeight() + 24}px;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  line-height: 28px;
  font-family: 'RobotoSlab-Regular';
`

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`

export const AvatarIcon = styled(Icon)`
  color: #ff9000;

  width: 50px;
  height: 50px;
  padding: 7px;
  border-radius: 25px;
  background-color: #444;
  text-align: center;
  overflow: hidden;
`

export const ProvidersList = styled(
  FlatList as new () => FlatList<ProvidersProps>,
)`
  padding: 32px 24px 16px;
`

export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`

export const ProviderSchedule = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const ProviderScheduleText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`
