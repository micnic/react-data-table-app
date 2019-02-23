import React, { Component } from 'react';
import { DataContext } from '../../context';
import PaginationInput from './PaginationInput';

export default class TableControls extends Component {

  static contextType = DataContext;

  render() {

    const {
      paginationIndex,
      pageItems,
      goPrevPage,
      goNextPage
    } = this.context;
    const maxPageIndex = this.context.getMaxPageIndex();

    return (
      <div className="table-controls">
        <button onClick={goPrevPage}>&#60;&#60;&#60;</button>
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
        <button onClick={goNextPage}>&#62;&#62;&#62;</button>
        <PaginationInput/>
      </div>
    );
  }

  goToPage = (event) => {

    const pageIndex = Number(event.target.dataset.value);

    this.context.goToPage(pageIndex);
  }
}