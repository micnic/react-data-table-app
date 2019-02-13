import React, { Component } from 'react';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';
import TableControls from './TableControls/TableControls';
import DataManager from './DataManager/DataManager';
import logo from '../logo.svg';
import './App.scss';

class App extends Component {

  render() {

    return (
      <DataManager pageItems={10}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <table className="data-table">
              <TableHead/>
              <TableBody/>
            </table>
            <TableControls/>
          </header>
        </div>
      </DataManager>
    );
  }
}

export default App;
