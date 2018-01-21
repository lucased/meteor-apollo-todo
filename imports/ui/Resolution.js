import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Close } from 'rebass';
import { ALL_RESOLUTIONS_QUERY } from './App';

const ListItem = styled.li`
  max-width: 100%;
  list-style: none;
  padding: 10px 0;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.2;
  }
`;

class Resolution extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteResolution = () => {
    this.props.deleteResolution({
      variables: {
        _id: this.props._id,
      },
      update: (proxy, { data: { deleteResolution } }) => {
        const data = proxy.readQuery({ query: ALL_RESOLUTIONS_QUERY });
        const index = data.resolutions.findIndex(r => r._id === deleteResolution._id);
        data.resolutions.splice(index, 1);
        proxy.writeQuery({ query: ALL_RESOLUTIONS_QUERY, data });
      },
    });
  };

  render() {
    const { _id, name } = this.props;
    return (
      <ListItem>
        {name}
        <Close onClick={() => this.deleteResolution()} />
      </ListItem>
    );
  }
}

const DELETE_RESOLUTION_MUTATION = gql`
  mutation deleteResolutionMutation($_id: String!) {
    deleteResolution(_id: $_id) {
      _id
      name
    }
  }
`;

export default graphql(DELETE_RESOLUTION_MUTATION, { name: 'deleteResolution' })(Resolution);
