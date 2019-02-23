import React, { Component } from 'react';
import { DataContext } from '../../context';
import data from '../../MOCK_DATA.json';

const pageItems = 10;

export default class DataManager extends Component {

  state = {
    data,
    originalData: data,
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
      filterBy,
      goPrevPage,
      goNextPage,
      goToPage,
      deleteEntry,
      editEntry,
      saveEntry,
      cancelEdit,
      props: { pageItems } } = this;

    return (
      <DataContext.Provider value={{
        ...state,
        pageItems,
        getMaxPageIndex,
        sortBy,
        filterBy,
        goPrevPage,
        goNextPage,
        goToPage,
        deleteEntry,
        editEntry,
        saveEntry,
        cancelEdit
      }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }

  getMaxPageIndex = () => {

    const { length: dataLength } = this.state.data;

    return Math.ceil((dataLength / pageItems) - 1) * pageItems;
  }

  sortBy = (column) => {

    const newData = this.state.originalData.slice(0);
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

  filterBy = ({ first_name, last_name, email, gender, ip_address }) => {

    const fnRex = RegExp(first_name.split('').join('.*'), 'i');
    const lnRex = RegExp(last_name.split('').join('.*'), 'i');
    const emRex = RegExp(email.split('').join('.*'), 'i');
    const gnRex = RegExp(gender.split('').join('.*'), 'i');
    const ipRex = RegExp(ip_address.split('').join('.*'), 'i');

    const newData = this.state.originalData.filter((entry) => (
      fnRex.test(entry.first_name) &&
      lnRex.test(entry.last_name) &&
      emRex.test(entry.email) &&
      gnRex.test(entry.gender) &&
      ipRex.test(entry.ip_address)
    ));

    this.setState({
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

    const newData = this.state.originalData.slice(0);

    newData.splice(newData.findIndex((entry) => (entry.id === id)), 1);

    this.setState({
      data: newData,
      originalData: newData
    });
  };

  editEntry = (id) => {

    const entry = this.state.originalData.find((entry) => (entry.id === id));

    this.setState({
      edit: true,
      editedEntry: entry
    });
  };

  saveEntry = (entryData) => {

    const newOriginalData = this.state.originalData.slice(0);
    const newData = this.state.data.slice(0);
    const { editedEntry } = this.state;
    const newEntry = { ...editedEntry, ...entryData };

    newOriginalData.splice(newOriginalData.findIndex((entry) => (entry === editedEntry)), 1, newEntry);
    newData.splice(newData.findIndex((entry) => (entry === editedEntry)), 1, newEntry);

    this.setState({
      edit: false,
      editedEntry: null,
      data: newData,
      originalData: newOriginalData,
    });
  };

  cancelEdit = () => {

    this.setState({
      edit: false,
      editedEntry: null
    });
  };
}