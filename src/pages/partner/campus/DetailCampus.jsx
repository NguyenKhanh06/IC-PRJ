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

DetailCampus.propTypes = {
    
};

function DetailCampus(props) {
    const [campus, setCampus] = useState({});
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");



const fetchData = async (id) => {
await partnerAPI.getCampusDetail(props?.camp?.id).then((response)=>{
setCampus(response.responseSuccess)
setName(response.responseSuccess[0].name)
setAddress(response.responseSuccess[0].address)

console.log("detail", response.responseSuccess)
})
}


useEffect(() => {
    fetchData().catch((error) => {
    
    });
  }, []);

  useEffect(() => {
if(props.camp != null) {
setName(props.camp.name)
setAddress(props.camp.address)
}
  }, [props.camp])


  const handleUpdateCamp = () => {
    axios.put(`https://localhost:7115/api/v1/campus/update/${props.camp.id}?Name=${name}&Address=${address}&IsActive=true&PartnerId=${props.camp.partnerId}`).then((response)=>{
window.location.reload(false)

    console.log("update", response)
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
            style={{ padding: "6px 0px 0px 10px", marginTop: 40 }}
            className="title-section"
          >
            DETAIL AVATAR
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
              Detail Avatar
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
              Full Name
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
            placeholder='Topic'
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
        onClick={() => handleUpdateCamp()}
                variant="contained"
              >
                Update Campus
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

export default DetailCampus;