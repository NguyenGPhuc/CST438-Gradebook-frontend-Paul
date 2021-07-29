import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'

//    required properties -  assignment:  
class Gradebook extends Component {
    constructor(props) {
      super(props);
      console.log("Gradebook.cnstr "+ JSON.stringify(props.location.assignment));
      this.state = { rows :  [  ]};
    } 
    
     componentDidMount() {
      this.fetchGrades();
    }
 
    fetchGrades = () => {
      console.log("Gradebook.fetchGrades");
      const token = Cookies.get('XSRF-TOKEN');
      fetch(`${SERVER_URL}/gradebook/${this.props.location.assignment.assignmentId}`, 
        {  
          method: 'GET', 
          headers: { 'X-XSRF-TOKEN': token }, 
          credentials: 'include'
        } )
      .then((response) => response.json()) 
      .then((responseData) => { 
        if (Array.isArray(responseData.grades)) {
          // add attribute "id" to each row as index of row, i.e. 0, 1, 2, ...  
          this.setState({ 
            rows: responseData.grades.map((row,index) => {
                  return {id:index, assignmentGradeId: row.assignmentGradeId, name: row.name, email: row.email, grade: row.grade};
            } )
          });
        } else {
          toast.error("Fetch failed.", {
            position: toast.POSITION.BOTTOM_LEFT
          });
        }        
      })
      .catch(err => console.error(err)); 
    }
  
   // when submit button pressed, send updated grades to back end 
   //  and then fetch the new grades.
   handleSubmit = ( ) => {
      console.log("Gradebook.handleSubmit");
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`${SERVER_URL}/gradebook/${this.props.location.assignment.assignmentId}` , 
          {  
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json',
                       'X-XSRF-TOKEN': token }, 
            credentials: 'include',
            body: JSON.stringify({assignmentId:this.props.location.assignment.assignmentId,  grades: this.state.rows})
          } )
      .then(res => {
          if (res.ok) {
            toast.success("Grades successfully updated", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchGrades();
          } else {
            toast.error("Grade updated failed", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Put http status =' + res.status);
      }})
        .catch(err => {
          toast.error("Grade updated failed", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
   };        
    
    // when user has entered a new grade, update the state
    //  id    - index of row of grade change
    //  props - contains the new grade
    handleEditCellChange = ({ id, field, props }) => {
      this.setState(prevstate => {
        const rows = prevstate.rows;
        rows[id].grade = props.value;
        return rows;
      });
    };    
 
    render() {
       const columns = [
        { field: 'assignmentGradeId', headerName: 'Key', width: 150 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 250},
        { field: 'grade', headerName: 'Grade', width: 150 , editable:true}
        ];
      
        return(
            <div className="App">
              <Grid container>
                <Grid item>
                    <h4>{this.props.location.assignment.assignmentName}-
                        {this.props.location.assignment.courseTitle}</h4>                   
                </Grid>
              </Grid>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={this.state.rows} columns={columns} onEditCellChange={this.handleEditCellChange}  />
                <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleSubmit} >Submit</Button>
              </div>
              <ToastContainer autoClose={1500} />   
            </div>
            ); 
        };
}
 // check on properties.  location.assignment must exist  
Gradebook.propTypes = {
  location: (properties, propertyName, componentName) => {
      if ( properties.location.assignment == undefined ) {
        return new Error('Gradebook missing required property assignment.');
    }
  }
}

export default Gradebook;