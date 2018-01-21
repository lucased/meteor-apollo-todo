import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { injectGlobal } from 'styled-components';
import { Provider, Heading, Container, Divider, Flex, Box } from 'rebass';
import Resolution from './Resolution';

import ResolutionForm from './ResolutionForm';
import RegistrationForm from './RegistrationForm';

injectGlobal`
  * { box-sizing: border-box; }
  body { 
    margin: 0;
    background: #eee;
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
`;

const CustomHeading = styled(Heading)`
  display: inline;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.2;
  }
`;

const App = ({ loading, resolutions, hi, client }) => (
  <Provider>
    <Container maxWidth="600px">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Flex direction="column">
            <Box width={1}>
              <CustomHeading is="h1">{hi}</CustomHeading>
              <Divider />
            </Box>
            <Box width={1}>
              <RegistrationForm client={client} />
              <ResolutionForm client={client} />
              <List>
                {resolutions.map(r => <Resolution key={r._id} _id={r._id} name={r.name} />)}
              </List>
            </Box>
          </Flex>
        </div>
      )}
    </Container>
  </Provider>
);

export const ALL_RESOLUTIONS_QUERY = gql`
  query ResolutionsQuery {
    hi
    resolutions {
      _id
      name
    }
  }
`;

export default graphql(ALL_RESOLUTIONS_QUERY, {
  props: ({ data }) => ({ ...data }),
})(withApollo(App));
