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

DetailAvt.propTypes = {
    
};

function DetailAvt(props) {
    const [avatar, setAvatar] = useState({});
    const [fullName, setFullName] = useState("");
    const [UserName, setUserName] = useState("");
    const [password, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

const fetchData = async (id) => {
await partnerAPI.getAvtDetail(props?.avt?.id).then((response)=>{
setAvatar(response.responseSuccess)
setFullName(response.responseSuccess.fullName)
setUserName(response.responseSuccess.username)
setPass(response.responseSuccess.password)
setEmail(response.responseSuccess.email)
setBirthday(response.responseSuccess.birthDay)
setGender(response.responseSuccess.gender)
setAddress(response.responseSuccess.address)
setPhoneNumber(response.responseSuccess.phoneNumber)
console.log(response.responseSuccess)
})
}
console.log("avt", props.avt)

useEffect(() => {
    fetchData().catch((error) => {
    
    });
  }, []);

  useEffect(() => {
if(props.avt != null) {
    setFullName(props.avt.fullName)
setUserName(props.avt.username)
setPass(props.avt.password)
setEmail(props.avt.email)
setBirthday(props.avt.birthDay)
setGender(props.avt.gender)
setAddress(props.avt.address)
setPhoneNumber(props.avt.phoneNumber)
}
  }, [props.avt])


  const handleUpdateAvt = () => {
    axios.put(`https://localhost:7115/api/v1/avatar/update/${props.avt.id}?Username=${UserName}&Password=${password}&FullName=${fullName}&Email=${email}&StaffNo=123&BirthDay=${birthday}&PhoneNumber=${phoneNumber}&Address=${address}&Gender=${gender}&IsActive=true&PartnerId=${props.avt.partnerId}`).then((response)=>{
   

        window.location.reload(false)
    })
  }


const handleChangeName = (e) => {
    setFullName(e.target.value)
}
const handleChangeUserName = (e)=>{
    setUserName(e.target.value)
}
const handleChangePass = (e) => {
    setPass(e.target.value)
}
const handleChangeEmail = (e) => {
    setEmail(e.target.value)
}
const handleChangeBirthday = (e) => {
    setBirthday(e.target.value)
}
const handleChangeGender = (e) => {
    setGender(e.target.value)
}

const handleChangeAddress = (e) => {
    setAddress(e.target.value)
}
const handleChangePhone= (e)=>{
    setPhoneNumber(e.target.value)
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
                value={fullName}
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
          User Name
            </Typography>
            <StyledTextField
            placeholder='Topic'
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={UserName}
                onChange={handleChangeUserName}
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
      Password
            </Typography>
            <StyledTextField
            style={{ marginBottom: 30 }}

            autoComplete="off"
            fullWidth
            size="small"
            name="password"
            value={password}
            onChange={handleChangePass}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              ),
            }}
     
            
          />
    
          </Box>
          <Box
            sx={{
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
         Email
            </Typography>
            <StyledTextField
            placeholder='Email'
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={email}
                onChange={handleChangeEmail}
              />
          </Box>


          <Stack
                  sx={{
                    marginTop: 3,
                  }}
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                  spacing="5%"
                >

<Box
                    sx={{
                      width: "100%",
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
              Birthday
            </Typography>
                         
    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                value={birthday}
                onChange={(newValue) => {
                  setBirthday(newValue);
                }}
                renderInput={(params) => <StyledTextField fullWidth size="small" {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Box
                    sx={{
                      width: "100%",
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
           Gender
            </Typography>
            <StyledTextField
            placeholder='Gender'
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={gender}
                onChange={handleChangeGender}
              />
            
          </Box>
                </Stack>

        
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
         Phone Number
            </Typography>
            <StyledTextField
            placeholder='PhoneNumber'
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={phoneNumber}
                onChange={handleChangePhone}
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
        onClick={() => handleUpdateAvt()}
                variant="contained"
              >
                Update avatar
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

export default DetailAvt;