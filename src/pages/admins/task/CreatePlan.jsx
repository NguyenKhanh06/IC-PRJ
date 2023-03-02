import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ColorButton } from '../../../styles/button';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { StyledTextField } from '../../../styles/textfield';
import taskAPI from '../../../api/taskAPI';

CreatePlan.propTypes = {
    
};

function CreatePlan(props) {
    const [planName, setPlanName] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [open, setOpen] = useState(true);
    const data = {
        planName: planName
    }
const handleCreatePlan =() =>{
    taskAPI.CreatePlan(data).then((response) => {
        {response.isSuccess ? props.setShowAlert(true) : props.setShowAlertErr(true)}

        window.location.reload(false)
    })
}


const handleClose = () => {
  setOpen(props.close);
};

    return (
        <Dialog
        fullWidth
        maxWidth="md"
         open={props.show}
         onClose={props.close}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
    
         <DialogContent>
         <Box>
            <p style={{ padding: "6px 0px 0px 10px" }} className="title-section">
              CREATE PLAN
            </p>
    
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F8F8F8",
                width: "100%",
                padding: "40px 20px 20px 40px",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  borderBottom: "1px solid black",
                  borderBottomWidth: "100%",
                }}
              >
                <Typography
                  sx={{
                    
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Create new plan
                </Typography>
              </Box>
              <Box
              sx={{
                marginTop: 3,
              }}
            >
              <Typography
                sx={{
                  float: "left",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Plan Name
              </Typography>
              <StyledTextField
                placeholder='Plan Name'
                autoComplete="off"
                fullWidth
                size="small"
                name="name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </Box>
         
            <Box sx={{ marginTop: 6, marginLeft: "80%" }}>
              <ColorButton
                onClick={() => {
                  
                  handleCreatePlan();
                  handleClose();
                
                }}
                variant="contained"
              >
                Create plan
              </ColorButton>
            </Box>
              </Box>
              </Box>
         </DialogContent>
       </Dialog>
    );
}

export default CreatePlan;