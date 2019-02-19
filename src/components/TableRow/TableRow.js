import React, { Component } from 'react';
import TableRowEditor from '../TableRowEditor/TableRowEditor';
import DataContext from '../../context';

export default class TableRow extends Component {

  static contextType = DataContext;

  render() {

    const { entry } = this.props;
    const { edit, editedEntry } = this.context;

    return (
      <tr key={entry.id}>
        <td>{entry.id}</td>
        { (edit && editedEntry === entry) ? (
          <TableRowEditor entry={entry} />
        ) : (
          <>
            <td>{entry.first_name}</td>
            <td>{entry.last_name}</td>
            <td>{entry.email}</td>
            <td>{entry.gender}</td>
            <td>{entry.ip_address}</td>
            <td>
              <button data-id={entry.id} onClick={this.deleteEntry}>DEL</button>
              <button data-id={entry.id} onClick={this.editEntry}>EDIT</button>
            </td>
          </>
        )}
      </tr>
    );
  }

  deleteEntry = (event) => {

    const id = Number(event.target.dataset.id);

    this.context.deleteEntry(id);
  };

  editEntry = (event) => {

    const id = Number(event.target.dataset.id);

    this.context.editEntry(id);
  };
}