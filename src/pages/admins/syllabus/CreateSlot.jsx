import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Chip, Dialog, DialogContent, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import axios from 'axios';
import { ColorButton } from '../../../styles/button';
import SearchIcon from "@mui/icons-material/Search";
import syllabusAPI from '../../../api/syllabusAPI';
import moment from 'moment';
import DetailSyllabus from './DetailSyllabus';



CreateSlot.propTypes = {
    
};

function CreateSlot(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [slots, setSlots] = useState([])
    const [open, setOpen] = useState(true)
    const [type, setType] = useState(0);

    const handleChange = (event) => {
      setType(event.target.value);
    };
    const handleClose = () => {
      setOpen(props.closeCreateSlot);
    };
    const [inputValue, setInputValue] = useState({
        name: "",
        detail: "",
        session: "",
        timeAllocation: "",
        type: "",
      });

      const handleOnChangeInputSlot = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        const input = {
          ...inputValue,
          [name]: value,
        };
    
        setInputValue(input);
      };

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const data = {
        Name: inputValue.name,
        Detail: inputValue.detail,
        Session: inputValue.session,
        TimeAllocation: inputValue.timeAllocation,
        Type: inputValue.type,

      }
      const handleSubmit = (e) => {
         axios.post(`https://localhost:7115/api/v1/slot/create?Name=${inputValue.name}&Detail=${inputValue.detail}&Session=${inputValue.session}&TimeAllocation=${inputValue.timeAllocation}&Type=${inputValue.type}&SyllabusId=${props.syllabusID}`).then((response)=>{
          console.log(response);
          window.location.reload(false);
  
        })
      };

    return (
      <Dialog
      fullWidth
      maxWidth="md"
       open={props.showCreateSlot}
       onClose={props.closeCreateSlot}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
  
       <DialogContent>
       <Box>
          <p style={{ padding: "6px 0px 0px 10px" }} className="title-section">
            CREATE SLOT
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
                Create new slot
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
              Slot
            </Typography>
            <StyledTextField
              placeholder='Slot'
              autoComplete="off"
              fullWidth
              size="small"
              name="session"
              value={inputValue.session}
              onChange={handleOnChangeInputSlot}
            />
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
              Topic
            </Typography>
            <StyledTextField
              placeholder='Topic'
              autoComplete="off"
              fullWidth
              size="small"
              name="name"
              value={inputValue.name}
              onChange={handleOnChangeInputSlot}
            />
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
              Time Allocation
            </Typography>
        
            <StyledTextField
            type="number"
              placeholder=" Time Allocation"
              autoComplete="off"
              fullWidth
              size="small"
              name="timeAllocation"
              value={inputValue.timeAllocation}
              onChange={handleOnChangeInputSlot}
              InputProps={{
                endAdornment: <InputAdornment position="start">Minutes</InputAdornment>,
              }}
            />
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
              Learning Type
            </Typography>
            <StyledTextField
             placeholder='Learning Type'
              autoComplete="off"
              fullWidth
              size="small"
              name="type"
              value={inputValue.type}
              onChange={handleOnChangeInputSlot}
            />
            {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Learning Type"
          onChange={handleChange}
          sx={{ backgroundColor: "white" }}
          size="small"
        >
          <MenuItem value= {0}>None</MenuItem>
          <MenuItem value= {1}>Offline</MenuItem>
          <MenuItem value={2}>Online</MenuItem>
          <MenuItem value={3}>Offline/Online</MenuItem>
        </Select>
      </FormControl> */}
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
              Detail
            </Typography>
            <StyledTextField
              placeholder="Detail"
              autoComplete="off"
              fullWidth
              size="small"
              name="detail"
              value={inputValue.detail}
              onChange={handleOnChangeInputSlot}
            />
          </Box>
          <Box sx={{ marginTop: 6, marginLeft: "80%" }}>
            <ColorButton
              onClick={() => {
                
                handleSubmit();
                handleClose();
              
              }}
              variant="contained"
            >
              Create Slot
            </ColorButton>
          </Box>
            </Box>
            </Box>
       </DialogContent>
     </Dialog>

    );
}

export default CreateSlot;