import React, { Component , useCallback, useRef} from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/movieData";
import { AgGridReact } from 'ag-grid-react';
// import RequiredCellEditor from '../editCell';
import NumericEditor from './common/validation/numberEditor';
import Required from './common/validation/required';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MovieForm from './movieForm';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      selectedGenre: null,
      sortColumn: { path: "title", order: "asc" },
      rowSelection: 'multiple', 
      defaultColDef: {
        flex: 1,
      },
      rowSelection: 'multiple',
    };
    const routes = {
      "/new":()=><MovieForm/>
    };

  }
  
  onGridReady = (params) => {
      this.gridApi = params.api;
      console.log(this.gridApi)
      this.gridColumnApi = params.columnApi;
  };
  
  componentDidMount() {
    this.setState({ movies: getMovies() });
  }


  columndata = [
      { field: 'title',filter: true, cellEditor: Required, editable: true },
      { field: 'numberInStock', sortable: true, filter: true, cellEditor: NumericEditor,editable: true },
      { field: 'dailyRentalRate', sortable: true, filter: true,  cellEditor: NumericEditor, editable: true },
  ];

  onRemoveSelected = () => {
    const selectedData = this.gridApi.getSelectedRows();
    console.log(selectedData)
    const res = this.gridApi.applyTransaction({ remove: selectedData });
    printResult(res)
  };
  
  render() {
    return (
      <div className="row">

        <div className="col" style={{ height: 1000, width: '100%' }} >
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          {/* <a href="/movie/new">New Movie</a> */}
          <div className="ag-theme-alpine" style={{ height: 1000, width: '100%' }}>
            <button class="btn btn-danger" onClick={() => this.onRemoveSelected()}>
              Remove Selected
            </button>
            <AgGridReact
              // ref={gridRef}
              rowData={this.state.movies}
              columnDefs={this.columndata}
              defaultColDef={this.state.defaultColDef}
              rowSelection={this.state.rowSelection}
              animateRows={true}
              onGridReady={this.onGridReady}
              >
          </AgGridReact>
          </div>
        </div>
      </div>
    );
  }
}
function printResult(res) {
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
}

export default Movies;
