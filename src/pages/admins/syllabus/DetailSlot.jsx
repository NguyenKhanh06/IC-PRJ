import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import syllabusAPI from '../../../api/syllabusAPI';
import { StyledTextField } from '../../../styles/textfield';
import { ColorButton } from '../../../styles/button';
DetailSlot.propTypes = {
    
};

function DetailSlot(props) {
    const [slot, setSlot] = useState([]);
    const [editSession, setEditSession] = useState("");
    const [editTopic, setEditTopic] = useState("");
    const [editTime, setEditTime] = useState("");
    const [editType, setEditType] = useState("");
    const [editDetail, setEditDetail] = useState("");
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
      }, [slot]);
      
   useEffect(() => {
    if (slot != null) {
        setEditSession(slot.session)
        setEditTopic(slot.name)
        setEditTime(slot.timeAllocation)
        setEditType(slot.type)
        setEditDetail(slot.detail)
    }
  }, [slot]);
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
    return (
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
          backgroundColor: "#F0F0F0",
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
            Session
          </Typography>
          <StyledTextField
              label="Session"
              autoComplete="off"
              fullWidth
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
              label="Topic"
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
              label="Time Allocation"
              autoComplete="off"
              fullWidth
              size="small"
              name="SESSION"
              value={editTime}
              onChange={handleOnChangeTime}
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
            Learning's Type
          </Typography>
          <FormControl fullWidth>
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
          <MenuItem value={"Offline"}>Offline</MenuItem>
          <MenuItem value={"Online"}>Online</MenuItem>
          <MenuItem value={"Offline/Online"}>Offline/Online</MenuItem>
        </Select>
      </FormControl>
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
              label="Detail"
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
            
            <ColorButton
              onClick={() => {
                
              }}
              variant="contained"
            >
              Updat slot
            </ColorButton>
          </Stack>
      </Box>

 

   
      </Box>
    );
}

export default DetailSlot;