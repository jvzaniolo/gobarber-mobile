import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

import { Platform, Alert } from 'react-native'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentText,
} from './styles'
import api from '../../services/api'
import { ProvidersProps } from '../Dashboard'

interface RouteProps {
  providerId: string
}

interface AvailabilityItem {
  hour: number
  isAvailable: boolean
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const { params } = useRoute()
  const navigation = useNavigation()

  const routeParams = params as RouteProps

  const [availability, setAvailability] = useState<AvailabilityItem[]>([])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [providers, setProviders] = useState<ProvidersProps[]>([])
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  )

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data)
      })
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((prev) => !prev)
  }, [])

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false)
      }

      if (date) {
        setSelectedDate(date)
      }
    },
    [],
  )

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate)

      date.setHours(selectedHour)
      date.setMinutes(0)

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      })

      navigation.navigate('AppointmentCreated', { date: date.getTime() })
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao criar o agendamento, tente novamente.',
      )
    }
  }, [selectedDate, selectedHour, selectedProvider, navigation])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, isAvailable }) => {
        return {
          hour,
          isAvailable,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, isAvailable }) => {
        return {
          hour,
          isAvailable,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              onChange={handleDateChanged}
              textColor="#f4ede8"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(
                ({ hour, hourFormatted, isAvailable }) => (
                  <Hour
                    enabled={isAvailable}
                    selected={selectedHour === hour}
                    onPress={() => handleSelectHour(hour)}
                    isAvailable={isAvailable}
                    key={hourFormatted}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ hour, hourFormatted, isAvailable }) => (
                  <Hour
                    enabled={isAvailable}
                    selected={selectedHour === hour}
                    onPress={() => handleSelectHour(hour)}
                    isAvailable={isAvailable}
                    key={hourFormatted}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentText>Agendar</CreateAppointmentText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  )
}

export default CreateAppointment
