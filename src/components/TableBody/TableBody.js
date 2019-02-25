import React, { Component } from 'react';
import { DataContext } from '../../context';
import TableRow from '../TableRow/TableRow';
import TableSearchRow from '../TableSearchRow/TableSearchRow';

export default class TableBody extends Component {

  static contextType = DataContext;

  dragIndex = null;

  render() {

    const { data, paginationIndex, pageItems } = this.context;

    return (

      <tbody>
        <TableSearchRow/>
        {data.slice(paginationIndex, paginationIndex + pageItems).map((entry, index) => (
          <TableRow key={entry.id} index={index} entry={entry} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}/>
        ))}
      </tbody>
    );
  }

  handleMouseDown = (event) => {
    this.dragIndex = event.target.dataset.index;

    event.preventDefault();
  };

  handleMouseUp = (event) => {
    if (this.dragIndex !== event.target.dataset.index) {
      this.context.moveEntry(this.dragIndex, event.target.dataset.index);
    }
  };
}