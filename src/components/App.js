import React, { Component } from 'react';
import DataContext from '../context';
import logo from '../logo.svg';
import './App.css';

class App extends Component {

  static pageItems = 10;

  static contextType = DataContext;

  state = {
    paginationIndex: 0,
    inputValue: ''
  };

  render() {

    const { pageItems } = App;
    const { paginationIndex, inputValue } = this.state;

    const maxPageIndex = this.context.getMaxPageIndex();

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <DataContext.Consumer>
              {({ data, sortBy }) => (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th data-column="first_name" onClick={sortBy}>First Name</th>
                      <th data-column="last_name" onClick={sortBy}>Last Name</th>
                      <th data-column="email" onClick={sortBy}>E-mail</th>
                      <th data-column="gender" onClick={sortBy}>Gender</th>
                      <th data-column="ip_address" onClick={sortBy}>IP address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(paginationIndex, paginationIndex + App.pageItems).map((entry) => (
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
              )}
            </DataContext.Consumer>
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
              <input type="text" value={inputValue} onChange={this.handleInputChange} onKeyPress={this.handleInputEnter}/>
            </div>
          </header>
        </div>
    );
  }

  handleInputChange = (event) => {

    const { length: dataLength } = this.props.data;
    const { pageItems } = App;
    const { value } = event.target;
    const { ceil } = Math;

    if (/^\d*$/.test(value) && ((value >= 1 && value <= ceil(dataLength / pageItems)) || value === '')) {
      this.setState({
        inputValue: value
      });
    }
  }

  handleInputEnter = (event) => {

    if (event.key === 'Enter' && event.target.value !== '') {
      this.setState({
        paginationIndex: (event.target.value - 1) * App.pageItems
      });
    }
  }

  goPrevPage = () => {
    this.setState(({ paginationIndex }) => ({
      paginationIndex: Math.max(paginationIndex - App.pageItems, 0)
    }));
  }

  goNextPage = () => {

    const { pageItems } = App;

    this.setState(({ paginationIndex }) => ({
      paginationIndex: Math.min(paginationIndex + pageItems, this.getMaxPageIndex())
    }));
  }

  goToPage = (event) => {

    const pageIndex = Number(event.target.dataset.value);

    this.setState({
      paginationIndex: pageIndex * App.pageItems
    });
  }
}

export default App;
