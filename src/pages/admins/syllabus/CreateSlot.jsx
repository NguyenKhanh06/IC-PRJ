import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Chip, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import axios from 'axios';
import { ColorButton } from '../../../styles/button';
import SearchIcon from "@mui/icons-material/Search";
import syllabusAPI from '../../../api/syllabusAPI';
import moment from 'moment';



CreateSlot.propTypes = {
    
};

function CreateSlot(props) {

    const location = useLocation()
    const { syllabus, slot } = location.state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [slots, setSlots] = useState([])
    const [inputValue, setInputValue] = useState({
        name: "",
        detail: "",
        session: "",
        timeAllocation: "",
        type: "",
      });
      console.log("syllabusID", syllabus.id)
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
      const handleSubmit = async (e) => {
        let url =`https://localhost:7115/api/v1/slot/create?Name=${inputValue.name}&Detail=${inputValue.detail}&Session=${inputValue.session}&TimeAllocation=${inputValue.timeAllocation}&Type=${inputValue.type}&SyllabusId=${syllabus.id}`
        await axios.post(`https://localhost:7115/api/v1/slot/create?Name=${inputValue.name}&Detail=${inputValue.detail}&Session=${inputValue.session}&TimeAllocation=${inputValue.timeAllocation}&Type=${inputValue.type}&SyllabusId=${syllabus.id}`).then((response)=>{
          console.log(response);
          console.log(url);
          
        })
      };
      const fetchData = async () => {
        await syllabusAPI.getSyllabusWithID(syllabus.id).then((response) => {
          setSlots(response.responseSuccess?.slots)
          console.log("response.responseSuccess", response.responseSuccess.slots)
        });
      };
    
      useEffect(() => {
        fetchData().catch((error) => {
          console.log(error);
        });
      }, [slots]);
    return (
       <>
        <form onSubmit={handleSubmit} >
        <Box>
          <Link>
            <Button
              sx={{
                float: "left",
                marginBottom: 4,
              }}
              variant="outlined"
              color="success"
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Link>
          <p style={{ padding: "6px 0px 0px 10px" }} className="title-section">
            CREATE SLOT
          </p>
  
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
              Session
            </Typography>
            <StyledTextField
              label=" Session"
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
              label="Topic"
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
              label=" Time Allocation"
              autoComplete="off"
              fullWidth
              size="small"
              name="timeAllocation"
              value={inputValue.timeAllocation}
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
              Learning Type
            </Typography>
            <StyledTextField
              label="Learning Type"
              autoComplete="off"
              fullWidth
              size="small"
              name="type"
              value={inputValue.type}
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
              Detail
            </Typography>
            <StyledTextField
              label="Detail"
              autoComplete="off"
              fullWidth
              size="small"
              name="detail"
              value={inputValue.detail}
              onChange={handleOnChangeInputSlot}
            />
          </Box>
          <Box sx={{ marginTop: 6, marginLeft: "86%" }}>
            <ColorButton
              onClick={() => {
                handleSubmit();
              }}
              variant="contained"
            >
              Create Slot
            </ColorButton>
          </Box>
            </Box>
            </Box>
            </form>
            <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F0F0F0",
          width: "100%",
          padding: "40px 20px 20px 40px",
          borderRadius: "20px",
          marginTop: "20px",
        }}
      >
        <Stack
          justifyContent="space-around"
          direction="row"
          alignItems="center"
        >
          {/* <Button
              sx={{ marginRight: 10 }}
              size="small"
              color="success"
              startIcon={<ArrowBackIcon />}
              onClick={handleClose}
              variant="outlined"
            >
              Back
            </Button> */}
          <Typography
            style={{ marginRight: "auto" }}
            variant="h5"
            component="h2"
            gutterBottom
          >
            List Slot
          </Typography>
        </Stack>

        <Stack
          sx={{
            marginBottom: 2,
            marginTop: 2,
            height: 75,
            backgroundColor: "white",
          }}
          justifyContent="space-between"
          direction="row-reverse"
          alignItems="center"
          spacing={1}
        >
          <Box style={{ marginRight: "30px"  }}>
            <TextField
              id="outlined-start-adornment"
              size="small"
              sx={{ backgroundColor: "white", marginRight: "20px" }}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <ColorButton size="small" variant="contained">
              Search
            </ColorButton>
          </Box>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Session
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Topic
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Learning Type
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                 Time Allocation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slots
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((slot, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>

                    <TableCell component="th" scope="row">
                    <Link to={`/admin/detail-slot/${slot.id}`}>
                    <Button
                    
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {slot.session}
                      </Button>
          </Link>
                    </TableCell>
                    <TableCell align="left">{slot.name}</TableCell>
                    <TableCell align="left">{slot.type}</TableCell>
                    <TableCell align="left">{slot.timeAllocation}</TableCell>
                   
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={slots.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
       </>

    );
}

export default CreateSlot;