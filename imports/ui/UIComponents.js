import styled from 'styled-components';
import { Input, Button } from 'rebass';

export const BlackInput = styled(Input)`
  border: 1px solid black;
  border-radius: 0px;
`;

export const BlackButton = styled(Button)`
  border: 1px solid black;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: transparent;
  font-size: inherit;
  font-family: inherit;
  font-weight: 400;
  color: black;
  padding: 5px;
  border-radius: 0;
`;
