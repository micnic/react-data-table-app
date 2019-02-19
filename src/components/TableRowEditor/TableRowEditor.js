import React, { Component } from 'react';
import DataContext from '../../context';

export default class TableRowEditor extends Component {

  static contextType = DataContext;

  render() {

    const { entry } = this.props;
    const {
      first_name,
      last_name,
      email,
      gender,
      ip_address
    } = this.context;

    return (
      <>
        <td><input value={first_name} onChange={this.editFirstName}/></td>
        <td><input value={last_name} onChange={this.editLastName}/></td>
        <td><input value={email} onChange={this.editEmail}/></td>
        <td><input value={gender} onChange={this.editGender}/></td>
        <td><input value={ip_address} onChange={this.editIpAddress}/></td>
        <td>
          <button data-id={entry.id} onClick={this.saveEntry}>SAVE</button>
          <button onClick={this.context.cancelEdit}>CANCEL</button>
        </td>
      </>
    );
  }

  editFirstName = (event) => {
    this.context.editFirstName(event.target.value);
  }

  editLastName = (event) => {
    this.context.editLastName(event.target.value);
  }

  editEmail = (event) => {
    this.context.editEmail(event.target.value);
  }

  editGender = (event) => {
    this.context.editGender(event.target.value);
  }

  editIpAddress = (event) => {
    this.context.editIpAddress(event.target.value);
  }

  saveEntry = (event) => {

    const id = Number(event.target.dataset.id);

    this.context.saveEntry(id);
  };
}