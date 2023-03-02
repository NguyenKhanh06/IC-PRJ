import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import staffAPI from '../../../api/staffAPI';

AssignStaff.propTypes = {
    
};

function AssignStaff(props) {
    const [openAssign, setOpenAssign] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState([]);

    const handleChange = (event, value) => setSelectedOptions(value);
    
    const handleSubmit = () => {
       for( var i = 0; i <= selectedOptions.length; i++ ){

selectedStaff.push(selectedOptions[i].id)
console.log("map", selectedStaff);
       }
    }
    console.log("staff", selectedStaff)
    console.log("option", selectedOptions)
    const handleClose = () => {
        setOpenAssign(props.onClose)
    }

    const fetchDataStaff = async () => {
        await staffAPI.getList().then((response) => {
          setStaffs(response.responseSuccess);
        });
      };
      useEffect(() => {
        fetchDataStaff().catch((error) => {
          console.log(error);
        });
      }, []);
    
    return (
        <Dialog
        open={props.show}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {  <Typography variant="h5" component="h2" gutterBottom>
            Assign task
          </Typography>}
        </DialogTitle>
        <DialogContent>
        <Autocomplete
        style={{width: "500px"}}
        multiple
        id="tags-outlined"
        options={staffs}
        getOptionLabel={(option) => option.fullName}
        onChange={handleChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Assign member"
          />
        )}
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default AssignStaff;