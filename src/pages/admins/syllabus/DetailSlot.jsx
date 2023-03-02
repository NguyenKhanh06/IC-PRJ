import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Avatar, Box, Button, Dialog, DialogContent, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import syllabusAPI from '../../../api/syllabusAPI';
import { StyledTextField } from '../../../styles/textfield';
import { ColorButton } from '../../../styles/button';
import axios from 'axios';
DetailSlot.propTypes = {
    
};

function DetailSlot(props) {
    const [slot, setSlot] = useState([]);
    const [editSession, setEditSession] = useState("");
    const [editTopic, setEditTopic] = useState("");
    const [editTime, setEditTime] = useState("");
    const [editType, setEditType] = useState("");
    const [editDetail, setEditDetail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);
    const fetchData = async () => {
        await syllabusAPI.getSlotWithID(props.slotID).then((response) => {
          setSlot(response.responseSuccess[0]);
      
          console.log("response", response.responseSuccess);
        });
      };
      useEffect(() => {
        fetchData().catch((error) => {
          console.log(error);
        });
      }, []);
      console.log("detail slot", props.slotDetail)
      
      useEffect(() => {
        if (props.slotDetail != null) {
    
          setEditSession(props.slotDetail.session);
          setEditTopic(props.slotDetail.name);
          setEditTime(props.slotDetail.timeAllocation);
          setEditType(props.slotDetail.type);
          setEditDetail(props.slotDetail.detail);
        }
      }, [props.slotDetail]);
  const handleOnChangeSession = (event) => {
    setEditSession(event.target.value);
  };
  const handleOnChangeTopic = (event) => {
    setEditTopic(event.target.value);
  };
  const handleOnChangeTime = (event) => {
    setEditTime(event.target.value);
  };
  const handleOnChangeType = (event) => {
    setEditType(event.target.value);
  };
  const handleOnChangeDetail = (event) => {
    setEditDetail(event.target.value);
  };


  const handleUpdate = () => {
    axios.put(`https://localhost:7115/api/v1/slot/update/${props.slotID}?Name=${editTopic}&Detail=${editDetail}&Session=${editSession}&TimeAllocation=${editTime}&Type=${editType}&SyllabusId=${props.slotDetail.syllabusId}`).then((response) => {
      
      {response.isSuccess ? setShowAlert(true) : setShowAlertErr(true)}
    })
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
          DETAIL SLOT
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
            Detail Slot
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
            Slot
          </Typography>
          <StyledTextField
              autoComplete="off"
              fullWidth
              placeholder='Slot'
              size="small"
              name="SESSION"
              value={editSession}
              onChange={handleOnChangeSession}
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
            Topic
          </Typography>
          <StyledTextField
          placeholder='Topic'
              autoComplete="off"
              fullWidth
              size="small"
              name="SESSION"
              value={editTopic}
              onChange={handleOnChangeTopic}
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
            Time Allocation
          </Typography>
          <StyledTextField
           style={{backgroundColor: "white"}}
               type="number"
          placeholder='Time allocation'
               autoComplete="off"
               fullWidth
               size="small"
               name="fee"
               value={editTime}
               onChange={handleOnChangeTime}
               InputProps={{
                endAdornment: <InputAdornment position="start">Minutes</InputAdornment>,
              }}
          />
          {/* <StyledTextField
              label="Time Allocation"
              autoComplete="off"
              fullWidth
              size="small"
              name="SESSION"
              value={editTime}
              onChange={handleOnChangeTime}
            /> */}
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
            Learning Type
          </Typography>
          <StyledTextField
          placeholder= "Learning's type"
              autoComplete="off"
              fullWidth
              size="small"
              name="SESSION"
              value={editType}
              onChange={handleOnChangeType}
            />
          {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editType}
          label="Learning Type"
          onChange={handleOnChangeType}
          sx={{ backgroundColor: "white", textAlign: "left" }}
          size="small"
        >
                  <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"1"}>Offline</MenuItem>
          <MenuItem value={"2"}>Online</MenuItem>
          <MenuItem value={"3"}>Offline/Online</MenuItem>
        </Select>
      </FormControl> */}
          {/* <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={editType}
        label="Learning Type"
        onChange={handleChange}
        sx={{ backgroundColor: "white" }}
        size="small"
      >
        <MenuItem value={"Offline"}>Offline</MenuItem>
        <MenuItem value={"Online"}>Online</MenuItem>
        <MenuItem value={"Offline/Online"}>Offline/Online</MenuItem>
      </Select>
    </FormControl> */}
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
            Detail
          </Typography>
          <StyledTextField
          placeholder='Detail'
              autoComplete="off"
              fullWidth
              size="small"
              name="SESSION"
              value={editDetail}
              onChange={handleOnChangeDetail}
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
              onClick={() => {
                handleUpdate()
              }}
              variant="contained"
            >
              Update slot
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

<Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant='filled' onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }} >
    Update slot successful!!!!
  </Alert>
</Snackbar>
<Snackbar open={showAlertErr} autoHideDuration={6000} onClose={() => setShowAlertErr(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant='filled' onClose={() => setShowAlertErr(false)} severity="error" sx={{ width: '100%' }} >
    Update slot fail!!!!
  </Alert>
</Snackbar>
    </Dialog>
     
    );
}

export default DetailSlot;