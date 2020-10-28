import React from 'react';
import { Text, Button } from 'react-native';

import { Container } from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { logOut } = useAuth();

  return (
    <Container>
      <Button title="Sair" onPress={() => logOut()} />
      <Text>Dashboard</Text>
    </Container>
  );
};

export default Dashboard;
