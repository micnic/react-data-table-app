import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  static pageItems = 10;

  state = {
    paginationIndex: 0
  };

  render() {

    const { pageItems } = App;
    const { length: dataLength } = this.props.data;
    const { paginationIndex } = this.state;
    const { floor } = Math;

    const maxPageIndex = floor((dataLength / pageItems) - 1) * pageItems;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <table className="data-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Gender</th>
                <th>IP address</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.slice(paginationIndex, paginationIndex + App.pageItems).map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.first_name}</td>
                  <td>{entry.last_name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.gender}</td>
                  <td>{entry.ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-controls">
            <button onClick={this.goPrevPage}>&#60;&#60;&#60;</button>
            <div className="pagination">
              {
                (paginationIndex === 0) ? (
                  <>
                    <div className="page-item active">1</div>
                    <div className="page-item" data-value={1} onClick={this.goToPage}>2</div>
                    <div className="page-item" data-value={2} onClick={this.goToPage}>3</div>
                    <div className="page-item">...</div>
                    <div className="page-item" data-value={maxPageIndex / pageItems} onClick={this.goToPage}>Last</div>
                  </>
                ) : (paginationIndex === maxPageIndex) ? (
                  <>
                    <div className="page-item" data-value={0} onClick={this.goToPage}>First</div>
                    <div className="page-item">...</div>
                    <div className="page-item" data-value={(maxPageIndex / pageItems) - 2} onClick={this.goToPage}>{(maxPageIndex / pageItems) - 1}</div>
                    <div className="page-item" data-value={(maxPageIndex / pageItems) - 1} onClick={this.goToPage}>{(maxPageIndex / pageItems)}</div>
                    <div className="page-item active">{(maxPageIndex / pageItems) + 1}</div>
                  </>
                ) : (
                  <>
                    <div className="page-item" data-value={0} onClick={this.goToPage}>First</div>
                    <div className="page-item">...</div>
                    <div className="page-item" data-value={(paginationIndex / pageItems) - 1} onClick={this.goToPage}>{(paginationIndex / pageItems)}</div>
                    <div className="page-item active">{(paginationIndex / pageItems) + 1}</div>
                    <div className="page-item" data-value={(paginationIndex / pageItems) + 1} onClick={this.goToPage}>{(paginationIndex / pageItems) + 2}</div>
                    <div className="page-item">...</div>
                    <div className="page-item" data-value={maxPageIndex / pageItems} onClick={this.goToPage}>Last</div>
                  </>
                )
              }
            </div>
            <button onClick={this.goNextPage}>&#62;&#62;&#62;</button>
          </div>
        </header>
      </div>
    );
  }

  goPrevPage = () => {
    this.setState(({ paginationIndex }) => ({
      paginationIndex: Math.max(paginationIndex - App.pageItems, 0)
    }));
  }

  goNextPage = () => {

    const { pageItems } = App;
    const { length: dataLength } = this.props.data;
    const { floor, min } = Math;
    // const dataLength = this.props.data.length;

    this.setState(({ paginationIndex }) => ({
      paginationIndex: min(paginationIndex + pageItems, floor((dataLength / pageItems) - 1) * pageItems)
    }));
  }

  goToPage = (event) => {

    const pageIndex = Number(event.target.dataset.value);

    this.setState({
      paginationIndex: pageIndex * App.pageItems
    });
  }

  sortBy = (column, ascendent) => {
    this.props.data.sort((firstEntry, secondEntry) => {
      if (ascendent === true) {
        return firstEntry[column] - secondEntry[column];
      } else {
        return secondEntry[column] - firstEntry[column];
      }
    });
  }
}

export default App;
