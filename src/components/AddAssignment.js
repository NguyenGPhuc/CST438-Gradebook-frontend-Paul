import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import {SERVER_URL} from '../constants.js';
import { ToastContainer, toast } from 'react-toastify';


class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state={coureId :'', assignmentName: '', dueDate: ''}
    };


    handleChangeId = (event) =>  {
        this.setState({coureId: event.target.value});

        console.log(JSON.stringify(this.state));
    };


    handleChangeName = (event) =>  {
        this.setState({assignmentName: event.target.value});

        console.log(JSON.stringify(this.state));
    };

    handleChangeDate = (event) =>  {
        this.setState({dueDate: event.target.value});

        console.log(JSON.stringify(this.state));
    };


    handleSubmit = () => {
        console.log("Assignment.postAssignment check");
        fetch(`${SERVER_URL}/instructor/add`,
        // fetch("http://localhost:8081/instructor/add",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coureId: this.state.coureId,
                assignmentName: this.state.assignmentName,
                dueDate: this.state.dueDate,
            }),
          }).then(response => response.json()).then(responseData => {
            if (responseData.assignmentName !== undefined) {
                console.log("New assignment added to SQL");
                toast.success("New assignment added to SQL", {position: toast.POSITION.BOTTOM_LEFT});
            }
            else {
                console.log("Failed to add new assignment into SQL");
                toast.error("Failed to add new assignment into SQL", {position: toast.POSITION.BOTTOM_LEFT});
            }
          })
          .catch((err) => {
                toast.warning("New SQL added, but an issue occured", {position: toast.POSITION.BOTTOM_LEFT});
                console.error(err);
          });
        }
  
    render() {
        return(
            <div> 
                <h4> Add a new assignment </h4>
                <TextField autoFocus style = {{width:200}} label="Course ID" name="coureId" 
                    onChange={this.handleChangeId} value={this.state.coureId} /> 
                    {/* // onChange={this.handleChangeId} />  */}
                <br/>
                <br/>
                <TextField autoFocus style = {{width: 200}} label="Name" name="assignmentName" 
                    onChange={this.handleChangeName} value={this.state.assignmentName} /> 
                    {/* onChange={this.handleChangeName}  />  */}
                <br/>
                <br/>
                <TextField autoFocus style = {{width: 200}} label="Due date (YYYY-MM-DD)" name="dueDate" 
                    onChange={this.handleChangeDate} value={this.state.dueDate} /> 
                    {/* onChange={this.handleChangeDate}  />  */}
                <br/>
                <br/>
                <Button variant="outlined" color="primary" style={{margin: 10}}
                    onClick={this.handleSubmit} >Submit</Button>

                <ToastContainer autoClose={4000} />   
            </div>
        );
    }
    
}

export default AddAssignment;