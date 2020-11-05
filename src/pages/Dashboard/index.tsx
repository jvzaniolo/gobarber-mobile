import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  Logout,
  LogoutText,
  ProfileButton,
  UserAvatar,
  AvatarIcon,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderSchedule,
  ProviderScheduleText,
  ProvidersListTitle,
} from './styles'

export interface ProvidersProps {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<ProvidersProps[]>([])

  const { user, logOut } = useAuth()
  const { navigate } = useNavigation()

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const navigateToCreateAppointment = useCallback(
    (providerId) => {
      navigate('CreateAppointment', { providerId })
    },
    [navigate],
  )

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <Logout onPress={logOut}>
          <LogoutText>Sair</LogoutText>
        </Logout>
        <ProfileButton onPress={navigateToProfile}>
          {user.avatar_url ? (
            <UserAvatar source={{ uri: user.avatar_url }} />
          ) : (
              <AvatarIcon name="user" size={32} />
            )}
        </ProfileButton>
      </Header>

      <ProvidersList
        keyExtractor={(provider) => provider.id}
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderSchedule>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderScheduleText>Segunda à sexta</ProviderScheduleText>
              </ProviderSchedule>

              <ProviderSchedule>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderScheduleText>8h às 18h</ProviderScheduleText>
              </ProviderSchedule>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  )
}

export default Dashboard
