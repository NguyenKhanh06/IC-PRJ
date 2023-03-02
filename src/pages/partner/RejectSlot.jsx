import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { Box } from '@mui/system';
import axios from 'axios';
import slotAPI from '../../api/slotAPI';

RejectSlot.propTypes = {
    
};

function RejectSlot(props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("")


  const handleChangeReason = (e) => {
    setReason(e.target.value)
  }
    const handleClose = () => {
        setOpen(props.close)
      };


    
      const Swal = require("sweetalert2");
  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Update successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const showAlertError = () => {
    Swal.fire({
      title: "Error",
      text: "Update successful",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const formData = new FormData();
  formData.append("ReasonContent", reason)
  formData.append("SlotId", props.slotID)

      const handleRejectSlot = () => {
        axios 
          .put(
            `https://localhost:7115/api/v1/slot/updateStatus/${props.slotID}?Status=2`
          ).then((response) => {
            axios({
              method: "POST",
              data: formData,
              url: "https://localhost:7115/api/v1/reason/create",
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((response)=>{
              handleClose()
              console.log(response)
              {response.isSuccess ? showAlert() : showAlertError()}
            })
           
          })
      };
    return (
        <Dialog
        maxWidth={false}
        open={props.show}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p style={{ padding: "6px 0px 0px 10px" }} className="title-section">
            Reject Slot
          </p>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Reject reason
          </Typography>
          <textarea
          value= {reason}
          onChange = {handleChangeReason}
            placeholder="Please specify the reason for Reject"
            style={{ width: 766, height: 250 }}
          ></textarea>
        
        </DialogContent>
        <DialogActions sx={{ marginBottom: 3, marginRight: 3 }}>
          <Button
            size="small"
            onClick={handleClose}
            variant="text"
            sx={{ color: "#22a19a" }}
          >
            Cancel
          </Button>

          <Button
            size="small"
            onClick={() => handleRejectSlot()}
            variant="contained"
            color="error"
          >
            Reject Slot
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default RejectSlot;