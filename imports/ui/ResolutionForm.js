import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Flex } from 'rebass';
import { ALL_RESOLUTIONS_QUERY } from './App';
import { BlackButton, BlackInput } from './UIComponents';

class ResolutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resolutionText: '',
    };
  }

  updateText = text => this.setState({ resolutionText: text });

  submitResolution = () => {
    this.props.createResolution({
      variables: {
        name: this.state.resolutionText,
      },
      update: (proxy, { data: { createResolution } }) => {
        const data = proxy.readQuery({ query: ALL_RESOLUTIONS_QUERY });
        data.resolutions.push(createResolution);
        proxy.writeQuery({ query: ALL_RESOLUTIONS_QUERY, data });
      },
    });
    this.setState({ resolutionText: '' });
  };

  render() {
    return (
      <Flex>
        <BlackInput
          my={3}
          value={this.state.resolutionText}
          onChange={e => this.updateText(e.target.value)}
          placeholder="Enter To Do"
        />
        <BlackButton ml={1} onClick={() => this.submitResolution()}>
          Submit
        </BlackButton>
      </Flex>
    );
  }
}

const CREATE_RESOLUTION_MUTATION = gql`
  mutation createResolutionMutation($name: String!) {
    createResolution(name: $name) {
      _id
      name
    }
  }
`;

export default graphql(CREATE_RESOLUTION_MUTATION, { name: 'createResolution' })(ResolutionForm);
