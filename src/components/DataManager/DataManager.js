import React, { Component } from 'react';
import DataContext from '../../context';
import data from '../../MOCK_DATA.json';

const pageItems = 10;

export default class DataManager extends Component {

  state = {
    data,
    lastSortedColumn: 'id',
    sortedAscendent: true
  };

  render() {

    const { state, getMaxPageIndex, sortBy } = this;

    return <DataContext.Provider value={{ ...state, getMaxPageIndex, sortBy }}>
      {this.props.children}
    </DataContext.Provider>;
  }

  getMaxPageIndex = () => {

    const { length: dataLength } = this.state.data;

    return Math.ceil((dataLength / pageItems) - 1) * pageItems;
  }

  sortBy = (event) => {

    const column = event.target.dataset.column;
    const newData = this.state.data.slice(0);
    const ascendent = (column !== this.state.lastSortedColumn) || !this.state.sortedAscendent;

    newData.sort((firstEntry, secondEntry) => {
      if (ascendent === true) {
        return firstEntry[column].localeCompare(secondEntry[column]);
      } else {
        return secondEntry[column].localeCompare(firstEntry[column]);
      }
    });

    this.setState({
      lastSortedColumn: column,
      sortedAscendent: ascendent,
      data: newData
    });
  }
}