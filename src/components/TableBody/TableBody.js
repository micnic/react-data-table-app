import React, { Component } from 'react';
import DataContext from '../../context';
import TableRow from '../TableRow/TableRow';

export default class TableBody extends Component {

  static contextType = DataContext;

  render() {

    const { data, paginationIndex, pageItems } = this.context;

    return (

      <tbody>
        {data.slice(paginationIndex, paginationIndex + pageItems).map((entry) => (
          <TableRow key={entry.id} entry={entry} />
        ))}
      </tbody>
    );
  }
}