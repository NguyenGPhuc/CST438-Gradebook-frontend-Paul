import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
 
class AddAssignment extends Component {
      constructor(props) {
      super(props);
      this.state = {open: false, name:"", dueDate:"", courseId: 0 };
    };
    
    handleClickOpen = () => {
      this.setState( {open:true} );
    };
 
    handleClose = () => {
      this.setState( {open:false} );
    };
 
    handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value});
    }
 
  // Add the assignment and close the dialog
    handleAdd = () => {
       const assignment = {name: this.state.name, 
                          dueDate: this.state.dueDate, 
                          courseId: this.state.courseId}
       this.props.add(assignment);
       this.handleClose();
    }
 
    render()  { 
      return (
          <div>
            <Button id="addAssignmentID" variant="outlined" color="primary" style={{margin: 10}} 
                    onClick={this.handleClickOpen}>
              New Assignment
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>New Assignment</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                  <TextField id="courseID" autoFocus fullWidth label="Course Id" name="courseId" 
                             onChange={this.handleChange}  />
                  <br/><br/>
                  <TextField id="assignmentNameID" fullWidth label="Assignment name" name="name"
                              onChange={this.handleChange}  />
                  <br/><br/>
                  <TextField id="dueDateID"fullWidth label="Due Date" name="dueDate" 
                              onChange={this.handleChange}  /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="addID" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
              </Dialog>      
          </div>
      ); 
    }
}
 
// required property:  add is a function that is called by AddAssignment to perform the Add action
AddAssignment.propTypes = {
  add : PropTypes.func.isRequired
}
 
export default AddAssignment;
