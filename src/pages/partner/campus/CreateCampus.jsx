import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box, Button, Dialog, DialogContent, FormControl, IconButton, InputAdornment, MenuItem, Select, Snackbar, Stack, Typography } from '@mui/material';
import { StyledTextField } from '../../../styles/textfield';
import { ColorButton } from '../../../styles/button';
import partnerAPI from '../../../api/partnerAPI';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';

CreateCampus.propTypes = {
    
};

function CreateCampus(props) {
    const [campus, setCampus] = useState({});
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");


  const handleCreateCamp= () => {
        
    {props.setLoading(true)}
    axios.post(`https://localhost:7115/api/v1/campus/create?Name=${name}&Address=${address}&PartnerId=${props.partnerID}`).then((response)=>{
   console.log(`https://localhost:7115/api/v1/campus/create?Name=${name}&Address=${address}&PartnerId=${props.partnerID}`)
    console.log(response)
    {response.isSuccess ? props.setShowAlert(true) : props.setShowAlertErr(true)}
    
    {props.setLoading(false)}
           window.location.reload(false)
       })
  }


const handleChangeName = (e) => {
    setName(e.target.value)
}

const handleChangeAddress = (e) => {
    setAddress(e.target.value)
}



    return (
        <Dialog
        fullWidth
        maxWidth="md"
        onClose={props.close}
        aria-labelledby="customized-dialog-title"
        open={props.show}
      >
        {/* <DialogTitle
            id="customized-dialog-title"
            onClose={props.close}
          ></DialogTitle> */}
        <DialogContent>
        <Box>
        <Stack>
          <p
            style={{ padding: "6px 0px 0px 10px", marginTop: 20 }}
            className="title-section"
          >
            CREATE CAMPUS
          </p>
        </Stack>
  
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
                paddingBottom: 2,
                float: "left",
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              Create new campus
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                float: "left",
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              Campus Name
            </Typography>
            <StyledTextField
                autoComplete="off"
                fullWidth
                placeholder='Full Name'
                size="small"
                name="SESSION"
                value={name}
                onChange={handleChangeName}
              />
          </Box>
       
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                float: "left",
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
        Address
            </Typography>
            <StyledTextField
            placeholder='Address'
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={address}
                onChange={handleChangeAddress}
              />
          </Box>
          <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 6 }}
            >
              {/* <Button
                variant="contained"
                color="success"
                onClick={() => {
                 
                }}
              >
                Approve
              </Button> */}
                   <Button style= {{color: "#22A19A"}} variant="text" onClick = {props.close}>Close</Button>
              <ColorButton
        onClick={() => handleCreateCamp()}
                variant="contained"
              >
                Create Campus
              </ColorButton>
            </Stack>
        </Box>
  
   
  
     
        </Box>
        </DialogContent>
        {/* <DialogActions>
            <Button autoFocus onClick={props.close}>
              Save changes
            </Button>
            
          </DialogActions> */}
  
  
      </Dialog>
    );
}

export default CreateCampus;