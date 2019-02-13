import React, { Component } from 'react';
import classNames from 'classnames';
import DataContext from '../../context';

const toggleArrow = (lastSortedColumn, column, ascendent) => classNames({
  'arrow-down': (lastSortedColumn === column && ascendent),
  'arrow-up': (lastSortedColumn === column && !ascendent)
});

export default class TableHead extends Component {

  static contextType = DataContext;

  render() {

    const { lastSortedColumn, sortedAscendent, sortBy } = this.context;

    return (

      <thead>
        <tr>
          <th className={toggleArrow(lastSortedColumn, 'id', sortedAscendent)} data-column="id" onClick={sortBy}>Id</th>
          <th className={toggleArrow(lastSortedColumn, 'first_name', sortedAscendent)} data-column="first_name" onClick={sortBy}>First Name</th>
          <th className={toggleArrow(lastSortedColumn, 'last_name', sortedAscendent)} data-column="last_name" onClick={sortBy}>Last Name</th>
          <th className={toggleArrow(lastSortedColumn, 'email', sortedAscendent)} data-column="email" onClick={sortBy}>E-mail</th>
          <th className={toggleArrow(lastSortedColumn, 'gender', sortedAscendent)} data-column="gender" onClick={sortBy}>Gender</th>
          <th className={toggleArrow(lastSortedColumn, 'ip_address', sortedAscendent)} data-column="ip_address" onClick={sortBy}>IP address</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  }
}