import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  margin-bottom: 8px;
  background: #232129;
  border-radius: 10px;

  align-items: center;
  flex-direction: row;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
