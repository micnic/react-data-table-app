import React, { Component } from 'react';
import { DataContext, EditorContext } from '../../context';

export default class EditorManager extends Component {

  static contextType = DataContext;

  constructor(props) {

    super(props);

    const {
      first_name,
      last_name,
      email,
      gender,
      ip_address
    } = this.props.entry;

    this.state = {
      first_name,
      last_name,
      email,
      gender,
      ip_address
    };
  }

  render() {

    const {
      saveEntry,
      editFirstName,
      editLastName,
      editEmail,
      editGender,
      editIpAddress,
      context: { cancelEdit }
    } = this;

    return (
      <EditorContext.Provider value={{
        ...this.state,
        saveEntry,
        cancelEdit,
        editFirstName,
        editLastName,
        editEmail,
        editGender,
        editIpAddress
      }}>
        {this.props.children}
      </EditorContext.Provider>
    );
  }

  saveEntry = () => {
    this.context.saveEntry(this.state);
  };

  editFirstName = (first_name) => {
    this.setState({
      first_name
    });
  };

  editLastName = (last_name) => {
    this.setState({
      last_name
    });
  };

  editEmail = (email) => {
    this.setState({
      email
    });
  };

  editGender = (gender) => {
    this.setState({
      gender
    });
  };

  editIpAddress = (ip_address) => {
    this.setState({
      ip_address
    });
  };
}