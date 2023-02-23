import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ColorButton } from "../../../styles/button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

DetailTask.propTypes = {};

function DetailTask(props) {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const handleClose = () => {
    setOpen(props.close);
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
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
        <TextField
          sx={{ width: "80%" }}
          id="standard-basic"
          variant="standard"
          defaultValue="task"
        />
        <p
          style={{ padding: "6px 0px 0px 10px" }}
          className="title-section"
        ></p>
      </DialogTitle>
      <DialogContent>
    

          <Stack
           direction="row"
           justifyContent="flex-start"
           alignItems="center"
           spacing={5}
          >
            <Stack
             direction="column"
             justifyContent="center"
             alignItems="center"
             spacing={5}
             style={{color: "#8F8E8E"}}
            >
            <Typography>Project:</Typography>
            <Typography>Assign:</Typography>
            <Typography>Deadline:</Typography>
            <Typography>Status:</Typography>
            </Stack>
          <Stack
             direction="column"
             justifyContent="center"
             alignItems="center"
             spacing={2}
            >
                
            <Typography style={{marginBottom: "revert"}}>OJT</Typography>
                
                <AvatarGroup max={4}>
      <Avatar sx={{ bgcolor: "orange" }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
              
    <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
              <DatePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
            <FormControl sx={{ width: 240 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleChangeStatus}
                size="small"
              >
                <MenuItem value={10}>To do</MenuItem>
                <MenuItem value={20}>Process</MenuItem>
                <MenuItem value={23}>Review</MenuItem>
                <MenuItem value={30}>Done</MenuItem>
              </Select>
            </FormControl>
            </Stack>
        
          </Stack>
        {/* <ul style={{ lineHeight: 3.5, listStyle: "none" }}>
          <li>
            Project: <b>Study overseas</b>
          </li>
          <li>
            Assign:{" "}
            <Badge
              style={{ marginRight: "32px" }}
              badgeContent="Process"
              color="primary"
            >
              <Chip label="Nguyen Cong Khanh" />
            </Badge>
            <Badge
              style={{ marginRight: "32px" }}
              badgeContent="Process"
              color="primary"
            >
              <Chip label="Nguyen Cong Khanh" />
            </Badge>
            <IconButton aria-label="delete">
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
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </li>
          <li style={{ marginTop: 2 }}>
            Status:{" "}
            <FormControl sx={{ width: 240 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleChangeStatus}
                size="small"
              >
                <MenuItem value={10}>To do</MenuItem>
                <MenuItem value={20}>Process</MenuItem>
                <MenuItem value={23}>Review</MenuItem>
                <MenuItem value={30}>Done</MenuItem>
              </Select>
            </FormControl>
          </li>
        </ul> */}
        <p className="title-section">Description</p>
        <textarea
          placeholder="Click to add description"
          style={{ width: 766, height: 250 }}
        ></textarea>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={handleClose}
          variant="text"
          sx={{ color: "#22a19a" }}
        >
          Cancel
        </Button>

        <ColorButton size="small" onClick={handleClose} variant="contained">
          Save & close
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
}

export default DetailTask;
