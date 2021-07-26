import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import {DataGrid} from '@material-ui/data-grid';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

class Assignment extends Component {
    constructor(props) {
      super(props);
      this.state = {rows: []};
    };
 
   componentDidMount() {
    this.fetchAssignments();
  }
 
  fetchAssignments = () => {
    console.log("FETCH");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(SERVER_URL + '/gradebook', 
      {  
        method: 'GET', 
        headers: { 'X-XSRF-TOKEN': token }, 
        credentials: 'include'
      } )
    .then((response) => response.json()) 
    .then((responseData) => { 
      console.log("FETCH RESP DATA:"+JSON.stringify(responseData));
      if (Array.isArray(responseData.assignments)) {
        this.setState({ rows: responseData.assignments });
      } else {
        toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }        
    })
    .catch(err => console.error(err)); 
  }
  
   onRadioClick = (event) => {
     console.log("on click "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  
  render() {
    
     const columns = [
      { field: 'id', hide: true },
      {
        field: 'assignmentName',
        headerName: 'Assignment',
        width: 400,
        renderCell: (params) => (
          <div>
          <Radio
            checked={params.row.id == this.state.selected}
            onChange={this.onRadioClick}
            value={params.row.id}
            color="default"
            size="small"
          />
          {params.value}
          </div>
        )
      },
      { field: 'courseTitle', headerName: 'Course', width: 300 },
      { field: 'dueDate', headerName: 'Due Date', width: 200 }
      ];
    const irows = this.state.rows.map((row, index) => ( { id: index, ...row } )); 
    return (
      <div align="left" >
            <h4>Assignment(s) ready to grade: </h4>
             
              <div style={{ height: 450, width: '100%', align:"left"   }}>
                <DataGrid rows={irows} columns={columns} />
              </div>              
            
            <p/> 
            <Button component={Link} to={{pathname:'/gradebook' , assignment: this.state.rows[this.state.selected]}} 
                    variant="outlined" color="primary" style={{margin: 10}}>
              Grade
            </Button>
      </div>
    )
  }
}
export default Assignment;