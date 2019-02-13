import React, { Component } from 'react';
import DataContext from '../../context';

export default class PaginationInput extends Component {

  static contextType = DataContext;

  state = {
    value: ''
  }

  render() {

    return (
      <input type="text" value={this.state.value} onChange={this.handleInputChange} onKeyPress={this.handleInputEnter}/>
    );
  }

  handleInputChange = (event) => {

    const maxPageIndex = this.context.getMaxPageIndex();
    const { pageItems } = this.context;
    const { value } = event.target;
    const { ceil } = Math;

    if (/^\d*$/.test(value) && ((value >= 1 && value <= ceil((maxPageIndex + 1) /pageItems) ) || value === '')) {
      this.setState({
        value
      });
    }
  }

  handleInputEnter = (event) => {

    if (event.key === 'Enter' && event.target.value !== '') {
      this.context.goToPage((event.target.value - 1));
    }
  }
}