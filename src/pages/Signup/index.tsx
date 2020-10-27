import React from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToLogin, BackToLoginText } from './styles';

const SignUp = () => {
  const { goBack } = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button
              onPress={() => {
                console.log('deu');
              }}
            >
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogin onPress={goBack}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToLoginText>Voltar para login</BackToLoginText>
      </BackToLogin>
    </>
  );
};

export default SignUp;
