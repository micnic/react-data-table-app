import React, { Component } from 'react';
import DataContext from '../../context';

export default class TableBody extends Component {

  static contextType = DataContext;

  render() {

    const { data, edit, editedEntry, paginationIndex, pageItems } = this.context;

    return (

      <tbody>
        {data.slice(paginationIndex, paginationIndex + pageItems).map((entry) => (
          <tr key={entry.id}>
            <td>{entry.id}</td>
            { (edit && editedEntry === entry) ? (
              <>
                <td><input value={entry.first_name}/></td>
                <td><input value={entry.last_name}/></td>
                <td><input value={entry.email}/></td>
                <td><input value={entry.gender}/></td>
                <td><input value={entry.ip_address}/></td>
                <td>
                  <button data-id={entry.id} onClick={this.saveEntry}>SAVE</button>
                </td>
              </>
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
        ))}
      </tbody>
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

  saveEntry = (event) => {

    const id = Number(event.target.dataset.id);

    this.context.saveEntry(id);
  };
}