import React, { Component } from 'react';
import { DataContext } from '../../context';

export default class AddEntryButton extends Component {

  static contextType = DataContext;

  render() {

    return (
      <button onClick={this.addEntry}>ADD ENTRY</button>
    );
  }

  addEntry = () => {
    const entry = this.context.addEntry(() => {
      this.context.goToLastPage();
      this.context.editEntry(entry.id);
    });
  };
}