import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { ColorButton } from '../../../styles/button';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

CreateTask.propTypes = {
    
};

function CreateTask(props) {
    const [value, setValue] = useState(null);
const [open, setOpen] = useState(false);

const handleClose = () =>{
    setOpen(props.close)
}
    return (
        <Dialog
          maxWidth={false}
          open={props.show}
          onClose={props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <TextField
              sx={{ width: "80%" }}
              id="standard-basic"
              variant="standard"
              defaultValue=""
            />
            <p
              style={{ padding: "6px 0px 0px 10px" }}
              className="title-section"
            ></p>
          </DialogTitle>
          <DialogContent>
            <ul style={{ lineHeight: 3.5, listStyle: "none" }}>
              <li>
                Project: <b>Study overseas</b>
              </li>
              <li>
                Assign:{" "}
                <IconButton  aria-label="delete">
                  <PersonAddAlt1Icon sx={{ color: "#22a19a" }} />
                </IconButton>
              </li>
              <li style={{ marginTop: 2 }}>
                Dealine:{" "}
                <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </li>
            </ul>
            <p className="title-section">Description</p>
            <textarea placeholder="Click to add description" style={{ width: 766, height: 250 }}></textarea>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              onClick={props.close}
              variant="text"
              sx={{ color: "#22a19a" }}
            >
              Cancel
            </Button>
  
            <ColorButton size="small" onClick={handleClose} variant="contained">
              Create task
            </ColorButton>
          </DialogActions>
        </Dialog>
    );
}

export default CreateTask;