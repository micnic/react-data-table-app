import React, { Component } from 'react';
import DataContext from '../../context';
import data from '../../MOCK_DATA.json';

const pageItems = 10;

export default class DataManager extends Component {

  state = {
    data,
    edit: false,
    editedEntry: null,
    lastSortedColumn: 'id',
    sortedAscendent: true,
    paginationIndex: 0
  };

  render() {

    const {
      state,
      getMaxPageIndex,
      sortBy,
      goPrevPage,
      goNextPage,
      goToPage,
      deleteEntry,
      editEntry,
      props: { pageItems } } = this;

    return (
      <DataContext.Provider value={{
        ...state,
        pageItems,
        getMaxPageIndex,
        sortBy,
        goPrevPage,
        goNextPage,
        goToPage,
        deleteEntry,
        editEntry
      }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }

  getMaxPageIndex = () => {

    const { length: dataLength } = this.state.data;

    return Math.ceil((dataLength / pageItems) - 1) * pageItems;
  }

  sortBy = (event) => {

    const column = event.target.dataset.column;
    const newData = this.state.data.slice(0);
    const ascendent = (column !== this.state.lastSortedColumn) || !this.state.sortedAscendent;

    if (column === 'id') {
      newData.sort((firstEntry, secondEntry) => {
        if (ascendent) {
          return firstEntry['id'] - secondEntry['id'];
        } else {
          return secondEntry['id'] - firstEntry['id'];
        }
      });
    } else {
      newData.sort((firstEntry, secondEntry) => {
        if (ascendent) {
          return firstEntry[column].localeCompare(secondEntry[column]);
        } else {
          return secondEntry[column].localeCompare(firstEntry[column]);
        }
      });
    }

    this.setState({
      lastSortedColumn: column,
      sortedAscendent: ascendent,
      data: newData
    });
  }

  goPrevPage = () => {
    this.setState(({ paginationIndex }) => ({
      paginationIndex: Math.max(paginationIndex - this.props.pageItems, 0)
    }));
  }

  goNextPage = () => {
    this.setState(({ paginationIndex }) => ({
      paginationIndex: Math.min(paginationIndex + this.props.pageItems, this.getMaxPageIndex())
    }));
  }

  goToPage = (pageIndex) => {
    this.setState({
      paginationIndex: pageIndex * this.props.pageItems
    });
  }

  deleteEntry = (id) => {

    const newData = this.state.data.slice(0);

    newData.splice(newData.findIndex((entry) => (entry.id === id)), 1);

    this.setState({
      data: newData
    });
  };

  editEntry = (id) => {

    const entry = this.state.data.find((entry) => (entry.id === id));

    this.setState({
      edit: true,
      editedEntry: entry
    });
  };

  saveEntry = (id) => {

    const newData = this.state.data.slice(0);
    const entry = newData.find((entry) => (entry.id === id));

    this.setState({
      edit: false,
      editedEntry: null,
      data: newData
    });
  };
}