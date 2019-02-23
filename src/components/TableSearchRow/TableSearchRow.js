import React, { Component } from 'react';
import { DataContext } from '../../context';

export default class TableSearchRow extends Component {

  static contextType = DataContext;

  state = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    ip_address: ''
  };

  render() {

    return (
      <tr>
        <td></td>
        <td><input value={this.state.first_name} onChange={this.filterFirstName}/></td>
        <td><input value={this.state.last_name} onChange={this.filterLastName}/></td>
        <td><input value={this.state.email} onChange={this.filterEmail}/></td>
        <td><input value={this.state.gender} onChange={this.filterGender}/></td>
        <td><input value={this.state.ip_address} onChange={this.filterIpAddress}/></td>
        <td></td>
      </tr>
    );
  }

  filterFirstName = (event) => {
    this.setState({
      first_name: event.target.value
    }, () => {
      this.context.filterBy(this.state);
    });
  }

  filterLastName = (event) => {
    this.setState({
      last_name: event.target.value
    }, () => {
      this.context.filterBy(this.state);
    });
  }

  filterEmail = (event) => {
    this.setState({
      email: event.target.value
    }, () => {
      this.context.filterBy(this.state);
    });
  }

  filterGender = (event) => {
    this.setState({
      gender: event.target.value
    }, () => {
      this.context.filterBy(this.state);
    });
  }

  filterIpAddress = (event) => {
    this.setState({
      ip_address: event.target.value
    }, () => {
      this.context.filterBy(this.state);
    });
  }
}