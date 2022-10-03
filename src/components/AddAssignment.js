import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js';
import Assignment from './Assignment.js';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types'; 


class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state={ assignmentId: this.props.assignmentId, assignmentName: '', dueDate: 'YYYY-MM-DD'};
    };

 
  handleSubmit = () => {
    const { assignmentId, assignmentName, dueDate } = this.state;
    this.props.submit( assignmentId.trim(), assignmentName.trim(), dueDate.trim() );
    console.log("Submit check");
  }
  
  handleChange = (event) =>  {
    this.setState({[event.target.id]: event.target.value});
  }

   componentDidMount() {
    this.postAssignment();
   }

    postAssignment = () => {
        console.log("Assignment.postAssignment check");
        fetch('http://localhost:8081/instructor/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              assignmentId: this.state.assignmentId,
              assignmentName: this.state.assignmentName,
              dueDate: this.state.dueDate,
            })
            //  .then((response) => response.json()) 
          })
      }
    
    render() {
        return(
            <div> 
                <h4> Add a new assignment </h4>
                <TextField autoFocus style = {{width:200}} label="ID" name="assignmentId" 
                    onChange={this.handleChange} value={this.state.id} /> 
                <br/>
                <br/>
                <TextField style = {{width: 200}} label="Name" name="assignmentName" 
                    onChange={this.handleChange} value={this.state.alias} /> 
                <br/>
                <br/>
                <TextField style = {{width: 200}} label="Due date" name="dueDate" 
                    onChange={this.handleChange} value={this.state.alias} /> 
                <br/>
                <br/>
                <Button variant="outlined" color="primary" style={{margin: 10}}
                    onClick={this.handleSubmit} >Submit</Button>
            </div>
        );
    }
    
}

AddAssignment.propTypes = {
    assignmentId:            PropTypes.number.isRequired,
    assignmentName:          PropTypes.number.isRequired,
    dueDate:                 PropTypes.string.isRequired,
    submit:                  PropTypes.func.isRequired,
    fetch:                   PropTypes.func.isRequired
};

export default AddAssignment;